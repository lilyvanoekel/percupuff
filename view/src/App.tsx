// import { Group } from "./components/elements/Group";
import { ParamKnob } from "./components/elements/ParamKnob";

function App() {
  return (
    <div>
      <svg width="0" height="0" viewBox="0 0 0 0">
        <defs>
          <g id="unit-h">
            <path d="M0 20 L20 40 L180 40 L200 20 L180 0 L20 0 Z"></path>
          </g>
          <g id="unit-v">
            <path d="M20 0 L0 20 L0 180 L20 200 L40 180 L40 20 Z"></path>
          </g>
          <radialGradient id="knobGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />{" "}
            <stop offset="40%" stopColor="rgba(255, 255, 255, 1)" />{" "}
            <stop offset="100%" stopColor="rgba(0, 0, 0, 1)" />{" "}
          </radialGradient>
          <linearGradient id="glassEffect" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id="glassGradient" cx="30%" cy="36%" r="70%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />{" "}
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.2)" />{" "}
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />{" "}
          </radialGradient>
        </defs>
      </svg>

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
      <div
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
