import React from "react";
import { pipe } from "../../common/fp/pipe";
import { getNumberFromEvent } from "../../common/dom/event";
import { useParamStore, Param, paramRange } from "../../ParamStore";

interface SliderProps {
  param: Param;
}

export const Slider: React.FC<SliderProps> = ({ param }) => {
  const { state, updateParam } = useParamStore();

  const [min, max, step] = paramRange[param];

  return (
    <input
      type="range"
      name={param}
      min={min}
      max={max}
      step={step}
      value={state[param]}
      onChange={pipe(getNumberFromEvent, updateParam(param))}
    />
  );
};
