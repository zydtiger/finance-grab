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
import Modal from "./common/Modal/Modal";

const Downloader: React.FC<{ port: string }> = ({ port }) => {
  const theme = useContext(globalThemeContext);

  const [type, setType] = useState<DownloaderType>("history");
  const Form = createForm<Record<string, string>>(DownloaderScheme[type]);
  const formRef = useRef<FormHandle<Record<string, string>>>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>("file.csv");
  const [responseText, setResponseText] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
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
        <Modal
          isOpen={isModalOpen}
          buttons={["Save to file", "Cancel"]}
          onClose={async button => {
            if (button === 0) await saveToFile();
            setIsModalOpen(false);
          }}
        >
          <pre style={{ color: theme.colorText }}>{responseText}</pre>
        </Modal>
      </Flex>
    </div>
  );
};

export default Downloader;
