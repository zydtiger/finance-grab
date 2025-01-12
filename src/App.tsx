/**
 * App root component.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { globalThemeContext } from "./theme";
import Downloader from "./components/Downloader";
import Flex from "./components/common/Flex/Flex";
import "./App.css";

const App = () => {
  const theme = useContext(globalThemeContext);
  const [serverPort, setServerPort] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get server port on component mount
    const initializeServer = async () => {
      try {
        const port = await invoke("get_server_port");
        console.info("Server starting at:", +`${port}`);
        setServerPort(port as string);
      } catch (err) {
        setError(err as string);
      }
    };

    initializeServer();
  }, []);

  if (error) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{
          width: "100vw",
          height: "100vh",
          background: theme.colorBg,
          color: theme.colorText,
        }}
      >
        <h1>Error connecting to server: {error}</h1>
      </Flex>
    );
  }

  if (!serverPort) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{
          width: "100vw",
          height: "100vh",
          background: theme.colorBg,
          color: theme.colorText,
        }}
      >
        <h1>Connecting to server...</h1>
      </Flex>
    );
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
      <Downloader port={serverPort} />
    </main>
  );
};

export default App;
