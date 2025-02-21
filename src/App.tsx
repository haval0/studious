import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
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
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
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

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
      {items.map(item => (
        <ItemComponent item={item} />
      ))}
    </main>
  );
}

export default App;
