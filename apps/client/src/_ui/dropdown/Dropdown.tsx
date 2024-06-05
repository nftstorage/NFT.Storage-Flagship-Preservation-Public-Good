"use client";
import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import IconBase from "../icons/IconBase";

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  placeholdericon?: any;
  isRequired?: boolean;
  isDisabled?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  borderColor?: string;
  backgroundColor?: string;
  width?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select",
  isRequired = false,
  isDisabled = false,
  size = "md",
  borderColor = "#000",
  backgroundColor = "white",
  width,
  placeholdericon,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };
  return (
    <div
      className={`${styles.dropdown} ${styles[`dropdown-${size}`]} ${
        isDisabled ? styles.disabled : ""
      }`}
      style={{
        width: width ? width : "100%",
      }}
      onClick={toggleDropdown}
    >
      <div className={styles.dropdownHeader} style={{ borderColor }}>
        <div className={styles.dropdownSelected}>
          <span className={styles.optionIcon}>
            {options.find((option) => option.value === value)?.icon ||
              placeholdericon}
          </span>
          {options.find((option) => option.value === value)?.label ||
            placeholder}
        </div>
        <div className={`${styles.dropdownIcon} ${isOpen ? styles.open : ""}`}>
          <IconBase slug="icon-chevron-down" />
        </div>
      </div>
      {isOpen && (
        <div
          className={styles.dropdownOptions}
          style={{ borderColor, backgroundColor }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.dropdownOption} ${
                value === option.value ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.icon && (
                <span className={styles.optionIcon}>{option.icon}</span>
              )}
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
