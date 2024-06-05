import { tokenUpload } from "@/services/ApiService";
import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import IconBase from "../icons/IconBase";
import style from "@/styles/GlobalConstants";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onUploadComplete?: () => void;
}

export default function FileUpload({
  onFileUpload,
  onUploadComplete,
}: FileUploadProps) {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);
  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (
        file &&
        (file.type === "text/csv" || file.type === "application/json")
      ) {
        // onFileUpload(file);
        await onFileUpload(file);
      } else {
        toast.error("Please upload a CSV file.");
      }
    },
    [onFileUpload]
  );

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (
      file &&
      (file.type === "text/csv" || file.type === "application/json")
    ) {
      await onFileUpload(file);
    } else {
      toast.error("Please upload a CSV file.");
    }
  };

  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`file-upload ${dragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleUploadAreaClick}
      style={{
        border: "1px dashed black",
        // height: "100px",
        padding: style.padding.md,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#C6E6F3",
      }}
    >
      <input
        type="file"
        accept=".csv"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <label
        htmlFor="file-upload-input"
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: "ChicagoFLF",
        }}
      >
        <IconBase slug="icon-folder-upload" size="xl" />
        <span style={{ marginTop: style.margin.xxs }}>
          Click or drag CSV here to upload.
        </span>{" "}
        {/* <br /> */}
        <span
          style={{
            fontFamily: "sans-serif",
            marginTop: style.margin.xxs,
            fontSize: style.font.h7,
            color: "#667085",
          }}
        >
          CSV must include Token ID / CID match.
        </span>
      </label>
    </div>
  );
}
