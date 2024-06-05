import style from "@/styles/GlobalConstants";
import FlexColumn from "./FlexColumn";

interface FlexWindowProp {
  view?: string;
  navLeft?: any;
  bodyElem: any;
}

export default function FlexWindow({
  navLeft,
  bodyElem,
  view = "row",
}: FlexWindowProp) {
  return (
    <>
      {view == "row" && (
        <>
          <div
            className="window-left"
            style={{ height: "100vh", position: "fixed", left: "0" }}
          >
            {navLeft}
          </div>
          <div
            className="window-right"
            style={{ marginLeft: `${style.nav.widthLeft}` }}
          >
            {bodyElem}
          </div>
        </>
      )}
      {view == "col" && <FlexColumn>{bodyElem}</FlexColumn>}
    </>
  );
}
