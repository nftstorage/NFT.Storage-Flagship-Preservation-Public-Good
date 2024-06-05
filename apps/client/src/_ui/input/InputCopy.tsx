import React, { useRef } from "react";
import ButtonNative from "../buttons/ButtonNative";
import toast from "react-hot-toast";

interface InputCopyPorps {
  value: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
}

export default function InputCopy({
  value,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
}: InputCopyPorps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const copyText = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #000",
        display: "flex",
        justifyContent: "space-between",
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        background: "white",
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        readOnly // Make input read-only
        style={{
          width: "100%",
          border: "0px",
          borderRight: "1px solid #000",
          outline: "none",
        }} // Prevent selection in input
        onClick={copyText}
      />
      <ButtonNative
        width="fit-content"
        onClick={copyText}
        iconLeft={{ slug: "icon-copy" }}
        text="Copy"
        paddingTop="12px"
        showShadow={false}
      ></ButtonNative>
    </div>
  );
}
