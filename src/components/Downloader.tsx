/**
 * DownloaderWidget to download stock ticker data.
 * @author tigerding <zhiyuanding01@gmail.com>
 */

// tauri
import { fetch } from "@tauri-apps/plugin-http";
import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { open } from "@tauri-apps/plugin-shell";

import { useContext, useRef, useState } from "react";
import { DownloaderType, DownloaderTypes } from "@/types";
import { globalThemeContext } from "@/theme";
import { capitalize } from "@/utils/string";
import { DownloaderEndpoints, DownloaderScheme } from "@/utils/schema";

// local components
import Flex from "./common/Flex/Flex";
import Select from "./common/Select/Select";
import Button from "./common/Button/Button";
import createForm from "./common/Form/Form";
import { FormHandle } from "./common/Form/types";

const Downloader: React.FC<{ port: string }> = ({ port }) => {
  const theme = useContext(globalThemeContext);

  const [type, setType] = useState<DownloaderType>("history");
  const Form = createForm<Record<string, string>>(DownloaderScheme[type]);
  const formRef = useRef<FormHandle<Record<string, string>>>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>("file.csv");
  const [responseText, setResponseText] = useState<string | null>(null);

  const fetchData = async () => {
    const formData = formRef.current?.getFormData();
    if (!formData) return;

    // Construct API URL, change port
    const apiURL = DownloaderEndpoints[type](formData);
    apiURL.port = port;
    console.info("Requesting URL:", apiURL.href);

    // Fetch data from API
    const response = await fetch(apiURL);
    if (!response.ok) {
      setResponseText(`Error: ${response.status} ${response.statusText}`);
      return;
    }
    setResponseText(await response.text());
    setDownloadFilename(`${formData["ticker"]}_${type}.csv`);
  };

  const saveToFile = async () => {
    if (!responseText) return;

    // Get file path from user
    const filePath = await save({
      filters: [
        {
          name: "CSV",
          extensions: ["csv"],
        },
      ],
      defaultPath: downloadFilename,
    });

    // Write response to file
    if (filePath) {
      await writeTextFile(filePath, responseText);
      open(filePath);
    }
  };

  return (
    <div style={{ color: theme.colorText, width: "100%" }}>
      <Select
        style={{ marginBottom: 10 }}
        options={DownloaderTypes.map(type => ({
          label: capitalize(type),
          value: type,
        }))}
        onChange={val => setType(val as DownloaderType)}
        value={type}
      />
      <Form
        ref={formRef}
        key={type} // re-render form when type changes
      />
      <Flex vertical align="center" gap={10} style={{ marginTop: 10 }}>
        <Button
          type="primary"
          style={{ width: 120, textAlign: "center" }}
          onClick={fetchData}
        >
          Fetch
        </Button>
        {responseText && (
          <>
            <pre
              style={{
                width: "100%",
                height: 300,
                overflow: "scroll",
              }}
            >
              {responseText}
            </pre>
            <Button
              style={{
                width: 120,
                textAlign: "center",
              }}
              onClick={saveToFile}
            >
              Save to file
            </Button>
          </>
        )}
      </Flex>
    </div>
  );
};

export default Downloader;
