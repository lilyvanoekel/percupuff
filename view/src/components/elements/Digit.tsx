import React from "react";

import { css } from "@emotion/react";

const inactive = css({
  fill: "#555555",
});

const activeGreen = css({
  fill: "rgba(0, 230, 0, 1)",
  filter: `drop-shadow(0 0 10px rgba(0, 230, 0, 0.8))
           drop-shadow(0 0 15px rgba(0, 230, 0, 0.7))
           drop-shadow(0 0 20px rgba(0, 230, 0, 0.9))`,
});

const activeRed = css({
  fill: "rgba(255, 50, 50, 1)",
  filter: `drop-shadow(0 0 10px rgba(255, 50, 50, 0.8))
           drop-shadow(0 0 15px rgba(255, 50, 50, 0.7))
           drop-shadow(0 0 20px rgba(255, 50, 50, 0.9))`,
});

export const Digit: React.FC<{ number: number; color: "red" | "green" }> = ({
  number,
  color,
}) => {
  const active = color == "red" ? activeRed : activeGreen;
  return (
    <div>
      <svg
        id="hour-1"
        className="num-0"
        width="160"
        height="240"
        viewBox="-30 -30 320 540"
      >
        <use
          xlinkHref="#unit-h"
          className="segment a"
          x="30"
          y="0"
          css={[0, 2, 3, 5, 6, 7, 8, 9].includes(number) ? active : inactive}
        ></use>
        <use
          xlinkHref="#unit-v"
          className="segment b"
          x="220"
          y="30"
          css={[1, 2, 3, 4, 7, 8, 9].includes(number) ? active : inactive}
        ></use>
        <use
          xlinkHref="#unit-v"
          className="segment c"
          x="220"
          y="250"
          css={[1, 3, 4, 5, 6, 7, 8, 9].includes(number) ? active : inactive}
        ></use>
        <use
          xlinkHref="#unit-h"
          className="segment d"
          x="30"
          y="440"
          css={[2, 3, 5, 6, 8, 9].includes(number) ? active : inactive}
        ></use>
        <use
          xlinkHref="#unit-v"
          className="segment e"
          x="0"
          y="250"
          css={[2, 6, 8].includes(number) ? active : inactive}
        ></use>
        <use
          xlinkHref="#unit-v"
          className="segment f"
          x="0"
          y="30"
          css={[4, 5, 6, 8, 9].includes(number) ? active : inactive}
        ></use>
        <use
          xlinkHref="#unit-h"
          className="segment g"
          x="30"
          y="220"
          css={[2, 3, 4, 5, 6, 8, 9].includes(number) ? active : inactive}
        ></use>
      </svg>
    </div>
  );
};
