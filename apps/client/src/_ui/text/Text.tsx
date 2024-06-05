interface TextProps {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  children?: React.ReactNode;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  width?: string;
}
export default function Text({
  fontFamily,
  fontSize,
  fontWeight,
  color,
  align,
  children,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  width,
}: TextProps) {
  return (
    <p
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        textAlign: align,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        width,
      }}
    >
      {children}
    </p>
  );
}
