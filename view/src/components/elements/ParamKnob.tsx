import React from "react";
import { useParamStore, Param } from "../../ParamStore";
import { Knob } from "./knob/Knob";
import { Digit } from "./Digit";

const getLastFourDigits = (num: number): (number | undefined)[] => {
  const numStr = num.toString();
  const lastFourDigits = numStr.slice(-4).split("");
  return Array(4 - lastFourDigits.length)
    .fill(undefined)
    .concat(lastFourDigits.map((digit) => Number(digit)));
};

export const ParamKnob: React.FC<{
  param: Param;
  width?: number;
  height?: number;
}> = ({ param, width = 120, height = 154 }) => {
  const { state, updateParam } = useParamStore();

  //const [min, max, step] = paramRange[param];

  const digitHeight = height - width;
  const digitWidth = (digitHeight / 3) * 2;
  const marginAdjust = height / 40;
  const digitPadding = height / 40;

  const digits = getLastFourDigits(Math.round(state[param]));

  //   return (
  //     <input
  //       type="range"
  //       name={param}
  //       min={min}
  //       max={max}
  //       step={step}
  //       value={state[param]}
  //       onChange={pipe(getNumberFromEvent, updateParam(param))}
  //     />
  //   );

  /*
        line-height: 1;
    padding: 2px 2px 0px;
    background: black;
    border: 1px solid #333333;
    drop-shadow: 1px 1px 1px #000000;
    box-shadow: 2px 2px 10px 1px #000000;
  */

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <div>
        <Knob
          value={state[param]}
          setValue={updateParam(param)}
          width={width}
          height={width}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: `-${marginAdjust}px`,
        }}
      >
        <div
          style={{
            lineHeight: "1",
            background: "#222222",
            border: "1px solid #333333",
            padding: `${digitPadding}px ${digitPadding}px 0px`,
            boxShadow: "1px 1px 3px 0px #000000 inset",
          }}
        >
          <Digit
            number={digits[0]}
            color="green"
            width={digitWidth}
            height={digitHeight}
          />
          <Digit
            number={digits[1]}
            color="green"
            width={digitWidth}
            height={digitHeight}
          />
          <Digit
            number={digits[2]}
            color="green"
            width={digitWidth}
            height={digitHeight}
          />
          <Digit
            number={digits[3]}
            color="green"
            width={digitWidth}
            height={digitHeight}
          />
        </div>
      </div>
    </div>
  );
};
