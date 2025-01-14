/**
 * App root component.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

import { useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-shell";
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
        const port = await invoke("start_python_server");
        console.info("Server started at:", +`${port}`);
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
        vertical
        gap={10}
        justify="center"
        align="center"
        style={{
          width: "100vw",
          height: "100vh",
          background: theme.colorBg,
          color: theme.colorText,
        }}
      >
        <h1>Error connecting to server:</h1>
        <code style={{ fontSize: 20 }}>{error}</code>
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
          cursor: "wait",
        }}
      >
        <h1>Connecting to server...</h1>
      </Flex>
    );
  }

  return (
    <Flex
      vertical
      gap={20}
      align="center"
      style={{
        padding: 20,
        background: theme.colorBg,
        color: theme.colorText,
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <h2>
        Server started at:{" "}
        <a
          onClick={() => open(`http://localhost:${serverPort}/docs`)}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          http://localhost:{serverPort}
        </a>
      </h2>
      <Downloader port={serverPort} />
    </Flex>
  );
};

export default App;
