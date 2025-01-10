/**
 * App root component.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { globalThemeContext } from "./theme";
import Downloader from "./components/Downloader";
import "./App.css";

function App() {
  const theme = useContext(globalThemeContext);
  const [serverPort, setServerPort] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // get server port on component mount
    const initializeServer = async () => {
      try {
        const port = await invoke("get_server_port");
        setServerPort(port as string);
      } catch (err) {
        setError(err as string);
      }
    };

    initializeServer();
  }, []);

  if (error) {
    return <div>Error connecting to server: {error}</div>;
  }

  if (!serverPort) {
    return <div>Connecting to server...</div>;
  }
  return (
    <main
      style={{
        padding: 20,
        background: theme.colorBg,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Downloader />
    </main>
  );
}

export default App;
