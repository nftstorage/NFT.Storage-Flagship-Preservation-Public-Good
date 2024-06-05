import gstyle from "@/styles/GlobalConstants";

type Props = {
  width?: string;
  height?: string;
  vrAlign?: string;
  hrAlign?: string;
  className?: string;
  children: any;
  padding?: string;
  flexWrap?: any;
  marginTop?: any;
  marginRight?: any;
  marginBottom?: any;
  marginLeft?: any;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  position?: any;
  overFlow?: any;
};

export default function FlexRow({
  width,
  height,
  vrAlign,
  hrAlign,
  className,
  children,
  padding,
  flexWrap,
  marginTop,
  marginLeft,
  marginBottom,
  marginRight,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  position,
  overFlow,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: flexWrap ? flexWrap : "nowrap",
        alignItems: vrAlign ? vrAlign : "center",
        justifyContent: hrAlign ? hrAlign : "center",
        flexDirection: "row",
        textAlign: "left",
        width: width ? width : "100%",
        height: height ? height : "100%",
        padding: padding ? padding : "0px",
        paddingLeft: paddingLeft ? `${gstyle.margin[paddingLeft]}` : "0px",
        paddingRight: paddingRight ? `${gstyle.margin[paddingRight]}` : "0px",
        paddingTop: paddingTop ? `${gstyle.margin[paddingTop]}` : "0px",
        paddingBottom: paddingBottom
          ? `${gstyle.margin[paddingBottom]}`
          : "0px",
        marginTop: marginTop ? `${gstyle.margin[marginTop]}` : "0px",
        marginLeft: marginLeft ? `${gstyle.margin[marginLeft]}` : "0px",
        marginBottom: marginBottom ? `${gstyle.margin[marginBottom]}` : "0px",
        marginRight: marginRight ? `${gstyle.margin[marginRight]}` : "0px",
        position: position ? position : "static",
        overflow: overFlow ? overFlow : "visible",
      }}
    >
      {children}
    </div>
  );
}
