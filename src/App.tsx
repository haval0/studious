import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import ItemComponent from "./components/ItemComponent";

interface Item {
  id: number,
  itemType: string,
  updated: string,
  titleSwedish: string,
  titleEnglish: string,
  author: string,
  authorDisplay: string,
  publishAs: string | null,
  publishAsDisplay: string | null,
  sticky: boolean,
  sensitive: boolean,
  publishDate: string,
  contentSwedish: string,
  contentEnglish: string,
  eventLocation: string | null,
  eventStartTime: string | null,
  eventEndTime: string | null,
  facebookEvent: string,
  googleForm: string,
  publishStatus: string,
}

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const items = await invoke<Item[]>('fetch_items');
    // TODO only set items if the new list is actually different
    setItems(items);
  }

  useEffect(() => {
        fetchItems();
        // Poll for new events every minute
        const interval = setInterval(fetchItems, 60000);
        return () => clearInterval(interval);
    }, []);

  return (
    <main className="container">
      {items.map(item => (
        <ItemComponent item={item} />
      ))}
    </main>
  );
}

export default App;
