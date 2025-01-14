// This file is the entry point for the app and starts the Python server.
// It also defines the Tauri commands that can be called from the frontend.

use std::env;
use std::io::{BufRead, BufReader};
use std::process::{Child, Command, Stdio};
use std::sync::Arc;
use tauri::path::BaseDirectory;
use tauri::{AppHandle, Listener, Manager};
use tokio::sync::{Mutex, OnceCell};

struct PythonServerState {
    subprocess: Option<Child>,
    port: Option<String>,
}

static PYTHON_SERVER: OnceCell<Arc<Mutex<PythonServerState>>> = OnceCell::const_new();

async fn get_python_server_state() -> Arc<Mutex<PythonServerState>> {
    PYTHON_SERVER
        .get_or_init(|| async {
            Arc::new(Mutex::new(PythonServerState {
                subprocess: None,
                port: None,
            }))
        })
        .await
        .clone()
}

#[tauri::command]
async fn start_python_server(app_handle: AppHandle) -> Result<String, String> {
    // Multiple requests to start Python server will be locked
    let server_state = get_python_server_state().await;
    let mut state = server_state.lock().await;

    // If port is already initialized, return existing port
    if let Some(port) = &state.port {
        tracing::info!("Python server is already running on port: {}", port);
        return Ok(port.clone());
    }

    // Start the Python server
    tracing::info!("Starting Python server...");
    internal_start_python_server(app_handle, &mut state).await
}

async fn internal_start_python_server(
    app_handle: AppHandle,
    state: &mut PythonServerState,
) -> Result<String, String> {
    let server_path = app_handle
        .path()
        .resolve("finance-api", BaseDirectory::Resource)
        .map_err(|e| e.to_string())?;
    let venv_path = server_path.join("venv");
    let venv_bin = venv_path.join("bin");
    let script_path = server_path.join("src").join("main.py");

    tracing::debug!("VENV         :  {}", venv_path.display());
    tracing::debug!("VENV_BIN     :  {}", venv_bin.display());
    tracing::debug!("SCRIPT_PATH  :  {}", script_path.display());

    // Modify the PATH environment variable to include the venv's `bin/` directory
    let mut path = env::var("PATH").unwrap_or_else(|_| String::new());
    path = format!("{}:{}", venv_bin.display(), path);
    env::set_var("PATH", path);

    // Set the VIRTUAL_ENV environment variable
    env::set_var("VIRTUAL_ENV", venv_path);

    // Start the Python server
    let mut child = Command::new("python") // `python` will now refer to the venv's Python
        .arg("-u") // Disable buffering for stdout
        .arg(script_path)
        .stdout(Stdio::piped())
        .spawn()
        .map_err(|e| e.to_string())?;

    tracing::info!("Spawned Python server subprocess");
    tracing::debug!("Server PID   :  {}", child.id());

    // Get the stdout handle
    let stdout = child.stdout.take().ok_or("Failed to capture stdout")?;
    let reader = BufReader::new(stdout);

    // Read until we find the port
    for line in reader.lines() {
        let line = line.map_err(|e| e.to_string())?;
        if line.starts_with("PORT=") {
            let port = line
                .split('=')
                .nth(1)
                .ok_or("Invalid PORT format")?
                .to_string();
            tracing::info!("Python server reported port: {}", port);
            state.port = Some(port.clone());
            state.subprocess = Some(child);
            return Ok(port);
        }
    }

    Err("Server did not output port information".to_string())
}

pub fn run() {
    let filter = if cfg!(debug_assertions) {
        tracing::Level::DEBUG
    } else {
        tracing::Level::INFO
    };
    tracing_subscriber::fmt().with_max_level(filter).init();

    tauri::Builder::default()
        .setup(|app| {
            // Enable DevTools in development mode
            #[cfg(debug_assertions)]
            app.get_webview_window("main").unwrap().open_devtools();

            // Listen for the close-requested event and kill the Python server subprocess
            app.get_webview_window("main").unwrap().listen(
                "tauri://close-requested",
                move |_event| {
                    let runtime = tokio::runtime::Runtime::new().unwrap();
                    runtime.block_on(async move {
                        let server_state = get_python_server_state().await;
                        let mut state = server_state.lock().await;
                        if let Some(mut subprocess) = state.subprocess.take() {
                            if let Err(e) = subprocess.kill() {
                                tracing::error!("Failed to kill Python server subprocess: {}", e);
                            } else {
                                tracing::info!("Killed Python server subprocess");
                            }
                        } else {
                            tracing::warn!("No Python server subprocess was running");
                        }
                    });
                },
            );

            Ok(())
        })
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![start_python_server])
        .run(tauri::generate_context!())
        .expect("Error while running Tauri application");
}
