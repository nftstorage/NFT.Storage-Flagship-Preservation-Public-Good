"use client";
import React, { useState } from "react";
import IconBase from "../icons/IconBase";

interface InputLabelProps {
  label?: string;
  placeholder?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  width?: string;
  inputValue?: any;
  onChange?: any;
  type?: any;
  searchIcon?: boolean;
}

const InputLabel = ({
  label,
  placeholder,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  width,
  inputValue,
  onChange,
  type = "text",
  searchIcon = false,
}: InputLabelProps) => {
  return (
    <div
      style={{
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        width,
        position: "relative",
      }}
    >
      {label && <label style={{ marginRight: "10px" }}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={type == "number" ? Number(inputValue) : inputValue}
        onChange={(e?: any) => {
          onChange(e);
        }}
        min={0}
        style={{
          color: "#667085",
          width: "100%",
          padding: searchIcon ? "10px 10px 10px 40px" : "10px",
          border: "1px solid #000",
          outline: "none",
          fontFamily: "SourceSansPro",
        }}
      />
      {searchIcon && (
        <div
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <IconBase slug="icon-search" />
        </div>
      )}
    </div>
  );
};

export default InputLabel;
