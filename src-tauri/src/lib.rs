// This file is the entry point for the app and starts the Python server.
// It also defines the Tauri commands that can be called from the frontend.

use std::env;
use std::io::{BufRead, BufReader};
use std::process::{Command, Stdio};

use tauri::path::BaseDirectory;
use tauri::{AppHandle, Manager};

#[tauri::command]
async fn start_python_server(app_handle: AppHandle) -> Result<String, String> {
    tokio::task::spawn_blocking(move || {
        // Get the path to the Python server folder
        let server_path = app_handle
            .path()
            .resolve("finance-api", BaseDirectory::Resource)
            .map_err(|e| e.to_string())?;
        let venv_path = server_path.join("venv");
        let venv_bin = venv_path.join("bin");
        let script_path = server_path.join("src").join("main.py");

        // Modify the PATH environment variable to include the venv's `bin/` directory
        let mut path = env::var("PATH").unwrap_or_else(|_| String::new());
        path = format!("{}:{}", venv_bin.display(), path); // Use `;` instead of `:` on Windows
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

        // Get the stdout handle
        let stdout = child.stdout.take().ok_or("Failed to capture stdout")?;
        let reader = BufReader::new(stdout);

        // Read until we find the port
        for line in reader.lines() {
            let line = line.map_err(|e| e.to_string())?;
            if line.starts_with("PORT=") {
                let port = line.split('=').nth(1).ok_or("Invalid PORT format")?;
                return Ok(port.to_string());
            }
        }

        Err("Server did not output port information".to_string())
    })
    .await
    .map_err(|e| e.to_string())?
}

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            // Enable DevTools in development mode
            #[cfg(debug_assertions)]
            app.get_webview_window("main").unwrap().open_devtools();
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
