// import { Group } from "./components/elements/Group";
import { Button } from "./components/elements/Button";
import { Button2 } from "./components/elements/Button2";
import { ParamKnob } from "./components/elements/ParamKnob";
import { SixteenSegment } from "./components/elements/SixteenSegment";
import { InstrumentPicker } from "./components/InstrumentPicker";
import { Logo } from "./components/Logo";

function App() {
  return (
    <div>
      <Logo />

      <InstrumentPicker />

      <div style={{ display: "flex" }}>
        <ParamKnob param="mainLevel" />
        <div style={{ marginLeft: "50px" }}>
          <ParamKnob param="mainLevel" width={60} height={77} />
        </div>
        <div style={{ marginLeft: "50px" }}>
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              textTransform: "uppercase",
              lineHeight: "28px",
              maskSize: "24px",
            }}
            className="noise-mask"
          >
            Main Volume
          </div>
          <ParamKnob param="mainLevel" width={90} height={115.5} />
        </div>
      </div>
      {/* <div
        style={{
          marginTop: "50px",
          textShadow:
            "0 0 2px rgba(255, 255, 255, 0.8), 0 0 5px rgba(255, 255, 255, 0.6)",
          color: "rgb(255, 255, 255)",
          // filter: "blur(1.0px)",
          fontSize: "36px",
        }}
      >
        POTATO
      </div> */}
      {/* <div
        style={{
          textAlign: "center",
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "uppercase",
          maskSize: "24px",
        }}
        className="noise-mask"
      >
        Main Volume
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "bold",
          textTransform: "uppercase",
          maskSize: "32px",
        }}
        className="noise-mask"
      >
        Main Volume
      </div> */}

      <div
        style={{
          lineHeight: "1",
          background: "#222222",
          border: "1px solid #333333",
          padding: `4px 4px 2px 4px`,
          boxShadow: "1px 1px 3px 0px #000000 inset",

          width: "188px",
          //height: "38px",
          boxSizing: "border-box",
          marginLeft: "50px",
          marginTop: "20px",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", marginTop: "2px" }}>
          <SixteenSegment color="green" character="\" width={20} height={30} />
          <SixteenSegment color="green" character="o" width={20} height={30} />
          <SixteenSegment color="green" character="_" width={20} height={30} />
          <SixteenSegment color="green" character="o" width={20} height={30} />
          <SixteenSegment color="green" character="|" width={20} height={30} />
          <SixteenSegment color="green" character="" width={20} height={30} />
          <SixteenSegment color="green" character="\" width={20} height={30} />
          <SixteenSegment color="green" character="o" width={20} height={30} />
          <SixteenSegment color="green" character="/" width={20} height={30} />
        </div>
      </div>
      <div
        style={{
          lineHeight: "1",
          background: "#222222",
          border: "1px solid #333333",
          padding: `4px 4px 2px 4px`,
          boxShadow: "1px 1px 3px 0px #000000 inset",

          width: "152px",
          //height: "38px",
          boxSizing: "border-box",
          marginLeft: "50px",
          marginTop: "20px",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex" }}>
          <SixteenSegment color="green" character="P" width={16} height={24} />
          <SixteenSegment color="green" character="E" width={16} height={24} />
          <SixteenSegment color="green" character="R" width={16} height={24} />
          <SixteenSegment color="green" character="C" width={16} height={24} />
          <SixteenSegment color="green" character="U" width={16} height={24} />
          <SixteenSegment color="green" character="P" width={16} height={24} />
          <SixteenSegment color="green" character="U" width={16} height={24} />
          <SixteenSegment color="green" character="F" width={16} height={24} />
          <SixteenSegment color="green" character="F" width={16} height={24} />
        </div>
        <div style={{ display: "flex", marginTop: "2px" }}>
          <SixteenSegment color="red" character="P" width={16} height={24} />
          <SixteenSegment color="green" character="O" width={16} height={24} />
          <SixteenSegment color="red" character="T" width={16} height={24} />
          <SixteenSegment color="green" character="A" width={16} height={24} />
          <SixteenSegment color="red" character="T" width={16} height={24} />
          <SixteenSegment color="green" character="O" width={16} height={24} />
          <SixteenSegment color="red" character="?" width={16} height={24} />
          <SixteenSegment color="green" character="?" width={16} height={24} />
          <SixteenSegment color="red" character="?" width={16} height={24} />
        </div>
      </div>

      <div style={{ marginLeft: "50px" }}>
        <Button />
      </div>

      <div style={{ marginLeft: "150px" }}>
        <Button2 />
      </div>

      {/* <Group /> */}
      {/* <div style={{ display: "flex" }}>
        <Digit number={1} color="red" width={160} height={240} />
        <Digit number={2} color="green" width={160} height={240} />
        <Digit number={3} color="red" width={160} height={240} />
        <Digit number={4} color="green" width={160} height={240} />
        <Digit number={5} color="green" width={160} height={240} />
        <Digit number={8} color="green" width={160} height={240} />
      </div> */}
    </div>
  );
}

export default App;
