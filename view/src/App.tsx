import { Digit } from "./components/elements/Digit";
import { Slider } from "./components/elements/Slider";

function App() {
  return (
    <>
      <svg width="0" height="0" viewBox="0 0 0 0">
        <defs>
          <g id="unit-h">
            <path d="M0 20 L20 40 L180 40 L200 20 L180 0 L20 0 Z"></path>
          </g>
          <g id="unit-v">
            <path d="M20 0 L0 20 L0 180 L20 200 L40 180 L40 20 Z"></path>
          </g>
        </defs>
      </svg>
      <div>Bello!</div>
      <Slider param="mainLevel" />
      <div style={{ display: "flex" }}>
        <Digit number={1} color="red" />
        <Digit number={2} color="green" />
        <Digit number={3} color="red" />
        <Digit number={4} color="green" />
        <Digit number={5} color="green" />
        <Digit number={8} color="green" />
      </div>
    </>
  );
}

export default App;
