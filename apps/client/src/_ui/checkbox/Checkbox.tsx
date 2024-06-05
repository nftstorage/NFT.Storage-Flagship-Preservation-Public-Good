import React from "react";
import Text from "../text/Text";

interface CheckboxProps {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  text?: string;
  children?: React.ReactNode;
}

const Checkbox = ({
  checked,
  onChange,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  text,
  children,
}: CheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        margin: 0,
        cursor: "pointer",
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <div
        style={{
          width: "20px",
          height: "20px",
          border: "2px solid black",
          borderRadius: "4px",
          backgroundColor: checked ? "black" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "8px",
        }}
      >
        {checked && <span style={{ color: "white" }}>✓</span>}
      </div>
      <Text>{text}</Text>
      {children}
    </label>
  );
};

export default Checkbox;
