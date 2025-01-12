// This file is the entry point for the app and starts the Python server.
// It also defines the Tauri commands that can be called from the frontend.

use std::io::{BufRead, BufReader};
use std::process::{Command, Stdio};

use tauri::path::BaseDirectory;
use tauri::{AppHandle, Manager};

#[tauri::command]
fn start_python_server(app_handle: AppHandle) -> Result<String, String> {
    // Get the path to the Python server folder
    let server_path = app_handle
        .path()
        .resolve("finance-api", BaseDirectory::Resource)
        .map_err(|e| e.to_string())?;

    // Start the Python server
    let mut child = Command::new(server_path.join("venv/bin/python"))
        .arg("-u") // Disable buffering for stdout
        .arg(server_path.join("src/main.py"))
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
