import React from "react";
import gStyle from "@/styles/GlobalConstants";
import Text from "../text/Text";
import IconBase from "../icons/IconBase";
import styles from "./ButtonNative.module.css";

type Props = {
  isLoading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "light" | "dark" | "transparent" | "active" | "disable";
  size?: "small" | "medium" | "large";
  iconLeft?: any;
  iconRight?: any;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  borderRadius?: number;
  borderColor?: string;
  paddingRight?: string;
  paddingLeft?: string;
  paddingTop?: string;
  paddingBottom?: string;
  textColor?: any;
  text?: string;
  width?: string;
  height?: string;
  hrAlign?: any;
  active?: boolean;
  border?: string;
  showShadow?: boolean;
};

export default function ButtonNative({
  isLoading = false,
  loadingText = "loading...",
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  textColor,
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  variant = "light",
  size = "medium",
  iconLeft,
  iconRight,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  borderRadius = 4,
  borderColor,
  text,
  width,
  hrAlign,
  active = false,
  height,
  border,
  showShadow = true,
}: Props) {
  const buttonStyle = {
    marginTop: marginTop ? gStyle.margin[marginTop] : 0,
    marginBottom: marginBottom ? gStyle.margin[marginBottom] : 0,
    marginRight: marginRight ? gStyle.margin[marginRight] : 0,
    marginLeft: marginLeft ? gStyle.margin[marginLeft] : 0,
    borderRadius: borderRadius
      ? gStyle.button.borderRadius[borderRadius]
      : gStyle.button.borderRadius.default,
    paddingRight: paddingRight ? paddingRight : "12px",
    paddingLeft: paddingLeft ? paddingLeft : "12px",
    paddingTop: paddingTop ? paddingTop : "6px",
    paddingBottom: paddingBottom ? paddingBottom : "12px",
    borderColor: borderColor,
    border: border, // Only add border if borderColor is provided
    height: height || "auto",
    width: width ? width : "100%",
    fontFamily: "SourceSansPro",
    // box-shadow: ;
    boxShadow: showShadow
      ? variant === "light"
        ? " inset 0px -7px 0px 0px #F5C32C,0px -8px 0px 0px #000 inset"
        : variant === "dark"
          ? " inset 0px -7px 0px 0px #FFF, 0px -8px 0px 0px #000 inset"
          : variant === "disable"
            ? " inset 0px -7px 0px 0px #FFF, 0px -8px 0px 0px #000 inset"
            : ""
      : "",

    cursor: `${disabled ? "not-allowed" : "pointer"}`,
  };
  return (
    <button
      type={type}
      className={`button-base ${styles[className]} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
    >
      <div
        style={{
          display: "flex",
          justifyContent: hrAlign || "flex-start",
          alignItems: "center",
        }}
      >
        {iconLeft && (
          <IconBase
            slug={iconLeft.slug}
            size={iconLeft.size}
            style={iconLeft.style}
          />
        )}
        {text && (
          <Text
            fontSize="1rem"
            marginLeft={gStyle.margin["xxs"]}
            marginRight={gStyle.margin["xxs"]}
            color="inherit"
          >
            {text}
          </Text>
        )}
        {iconRight && (
          <IconBase
            slug={iconRight.slug}
            size={iconRight.size}
            style={iconRight.style}
          />
        )}
      </div>
      {children}
    </button>
  );
}
