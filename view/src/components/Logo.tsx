import { SixteenSegment } from "./elements/SixteenSegment";

export const Logo = () => (
  <div style={{ padding: "10px" }}>
    <div
      style={{
        lineHeight: "1",
        background: "#222222",
        border: "1px solid #333333",
        padding: `4px 4px 2px 4px`,
        boxShadow: "1px 1px 3px 0px #000000 inset",
        width: "188px",
        boxSizing: "border-box",
        marginBottom: "20px",
        display: "flex",
      }}
    >
      <SixteenSegment color="red" character="P" width={26} height={39} />
      <SixteenSegment color="green" character="e" width={26} height={39} />
      <SixteenSegment color="green" character="r" width={26} height={39} />
      <SixteenSegment color="green" character="c" width={26} height={39} />
      <SixteenSegment color="green" character="u" width={26} height={39} />
      <SixteenSegment color="red" character="P" width={26} height={39} />
      <SixteenSegment color="green" character="u" width={26} height={39} />
      <SixteenSegment color="green" character="f" width={26} height={39} />
      <SixteenSegment color="green" character="f" width={26} height={39} />
    </div>
  </div>
);
