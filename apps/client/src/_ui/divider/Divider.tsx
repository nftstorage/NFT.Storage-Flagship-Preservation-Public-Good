import React from "react";

interface DividerProps {
  text?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}

const Divider = ({
  text,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}: DividerProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        width: "100%",
      }}
    >
      <hr style={{ flexGrow: 1, border: "1px solid #000" }} />
      {text && <span style={{ margin: "0 8px", color: "#666" }}>{text}</span>}
      <hr style={{ flexGrow: 1, border: "1px solid #000" }} />
    </div>
  );
};

export default Divider;
