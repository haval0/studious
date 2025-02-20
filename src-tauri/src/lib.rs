use serde::{Deserialize, Serialize};
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Item {
    id: isize,
    item_type: String,
    updated: String,
    title_swedish: String,
    title_english: String,
    author: String,
    author_display: String,
    publish_as: Option<String>,
    publish_as_display: Option<String>,
    sticky: bool,
    sensitive: bool,
    publish_date: String,
    content_swedish: String,
    content_english: String,
    event_location: Option<String>,
    event_start_time: Option<String>,
    event_end_time: Option<String>,
    facebook_event: String,
    google_form: String,
    publish_status: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct List {
    content: Vec<Item>,
}

// Mock function to simulate API fetch
#[tauri::command]
async fn fetch_items() -> Result<Vec<Item>, String> {
    let list: List = reqwest::get("https://calypso.datasektionen.se/api/list")
        .await
        .expect("Calypso API request failed (/list)")
        .json()
        .await
        .expect("Unexpected Calypso API response schema (/list)");
    Ok(list.content)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, fetch_items])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
