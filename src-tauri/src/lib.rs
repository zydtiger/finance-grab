// This file is the entry point for the app and starts the Python server.
// It also defines the Tauri commands that can be called from the frontend.

use std::io::{BufRead, BufReader};
use std::process::{Command, Stdio};
use std::sync::Mutex;

#[cfg(debug_assertions)]
use tauri::Manager;

static PORT: Mutex<Option<String>> = Mutex::new(None);

#[tauri::command]
fn get_server_port() -> Result<String, String> {
    match PORT.lock().unwrap().clone() {
        Some(port) => Ok(port),
        None => Err("Server port not yet initialized".to_string()),
    }
}

fn start_python_server() -> Result<(), Box<dyn std::error::Error>> {
    // Start the Python server process
    let mut child = Command::new("python")
        .arg("-u") // Disable buffering for stdout
        .arg("../finance-api/src/main.py")
        .stdout(Stdio::piped())
        .spawn()?;

    // Get the stdout handle
    let stdout = child.stdout.take().ok_or("Failed to capture stdout")?;
    let reader = BufReader::new(stdout);

    // Read until we find the port
    for line in reader.lines() {
        let line = line?;
        if line.starts_with("PORT=") {
            let port = line.split('=').nth(1).ok_or("Invalid PORT format")?;
            *PORT.lock().unwrap() = Some(port.to_string());
            return Ok(());
        }
    }

    Err("Server did not output port information".into())
}

pub fn run() {
    // Start the Python server before building the Tauri application
    if let Err(e) = start_python_server() {
        eprintln!("Failed to start Python server: {}", e);
    }

    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![get_server_port]);

    // Enable DevTools in development mode
    #[cfg(debug_assertions)]
    let builder = builder.setup(|app| {
        app.get_webview_window("main").unwrap().open_devtools();
        Ok(())
    });

    builder
        .run(tauri::generate_context!())
        .expect("Error while running Tauri application");
}
