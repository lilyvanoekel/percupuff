import React from "react";

const inactive: React.CSSProperties = {
  fill: "#444444",
};

const activeGreen: React.CSSProperties = {
  fill: "rgba(0, 230, 0, 1)",
  filter: `drop-shadow(0 0 10px rgba(0, 230, 0, 0.8))
           drop-shadow(0 0 15px rgba(0, 230, 0, 0.7))
           drop-shadow(0 0 20px rgba(0, 230, 0, 0.9))`,
};

const activeRed: React.CSSProperties = {
  fill: "rgba(255, 50, 50, 1)",
  filter: `drop-shadow(0 0 10px rgba(255, 50, 50, 0.8))
           drop-shadow(0 0 15px rgba(255, 50, 50, 0.7))
           drop-shadow(0 0 20px rgba(255, 50, 50, 0.9))`,
};

export const SixteenSegment: React.FC<{
  color: "red" | "green";
  number?: number;
  width?: number;
  height?: number;
}> = ({ number = -1, color, width = 160, height = 240 }) => {
  const active = color === "red" ? activeRed : activeGreen;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="-30 -30 320 540"
    >
      <defs>
        <g id="segment-h">
          <path d="M0 20 L20 40 L72 40 L92 20 L72 0 L20 0 Z"></path>
        </g>
        <g id="segment-h1">
          <path d="M96 20 L66 40 L20 40 L0 20 L20 0 L66 0 Z"></path>
        </g>
        <g id="segment-h2">
          <path d="M0 20 L30 40 L76 40 L96 20 L76 0 L30 0 Z"></path>
        </g>
        <g id="segment-v">
          <path d="M20 0 L0 20 L0 180 L20 200 L40 180 L40 20 Z"></path>
        </g>
        <g id="segment-v1">
          <path d="M20 200 L0 112 L0 20 L20 0 L40 20 L40 112 Z"></path>
        </g>
        <g id="segment-x1">
          <path d="M80 186 L62 106 L34 30 L0 0 L0 44 L50 166 Z"></path>
        </g>
        <g id="segment-v2">
          <path d="M20 0 L0 88 L0 180 L20 200 L40 180 L40 88 Z"></path>
        </g>
        <g id="segment-x2">
          <path d="M0 186 L18 106 L46 30 L80 0 L80 44 L30 166 Z"></path>
        </g>
        <g id="segment-x3">
          <path d="M80 0 L62 80 L34 156 L0 186 L0 142 L50 20 Z"></path>
        </g>
        <g id="segment-x4">
          <path d="M0 0 L18 80 L46 156 L80 186 L80 142 L30 20 Z"></path>
        </g>
      </defs>
      {/* Horizontal Segments */}
      <use
        href="#segment-h"
        x="56"
        y="0"
        style={[0, 2, 3, 5, 6, 7, 8, 9].includes(number) ? active : inactive}
      ></use>
      <use
        href="#segment-h"
        x="164"
        y="0"
        style={[0, 2, 3, 5, 6, 7, 8, 9].includes(number) ? active : inactive}
      ></use>
      <use
        href="#segment-h1"
        x="61"
        y="220"
        style={[2, 3, 4, 5, 6, 8, 9].includes(number) ? active : inactive}
        transform="skewX(-6)"
      ></use>
      <use
        href="#segment-h2"
        x="165"
        y="220"
        style={[2, 3, 4, 5, 6, 8, 9].includes(number) ? active : inactive}
        transform="skewX(-6)"
      ></use>
      <use
        href="#segment-h"
        x="13"
        y="440"
        style={[0, 2, 3, 5, 6, 8, 9].includes(number) ? active : inactive}
      ></use>
      <use
        href="#segment-h"
        x="121"
        y="440"
        style={[0, 2, 3, 5, 6, 8, 9].includes(number) ? active : inactive}
      ></use>

      {/* Slanted Vertical Segments */}
      <use
        href="#segment-v"
        x="30"
        y="30"
        transform="skewX(-6)"
        style={[0, 4, 5, 6, 8, 9].includes(number) ? active : inactive}
      ></use>
      <use
        href="#segment-v1"
        x="140"
        y="30"
        transform="skewX(-6)"
        style={[99].includes(number) ? active : inactive}
      ></use>
      <use
        href="#segment-v"
        x="250"
        y="30"
        transform="skewX(-6)"
        style={[0, 1, 2, 3, 4, 7, 8, 9].includes(number) ? active : inactive}
      ></use>
      <use
        href="#segment-v"
        x="30"
        y="250"
        transform="skewX(-6)"
        style={[0, 2, 6, 8].includes(number) ? active : inactive}
      ></use>
      <use
        href="#segment-v2"
        x="140"
        y="250"
        transform="skewX(-6)"
        style={[99].includes(number) ? active : inactive}
      ></use>
      <use
        href="#segment-v"
        x="250"
        y="250"
        transform="skewX(-6)"
        style={[0, 1, 3, 4, 5, 6, 7, 8, 9].includes(number) ? active : inactive}
      ></use>

      {/* X Segments */}
      <use
        href="#segment-x1"
        x="76"
        y="48"
        style={[99].includes(number) ? active : inactive}
        transform="skewX(-6)"
      ></use>
      <use
        href="#segment-x2"
        x="164"
        y="49"
        style={[99].includes(number) ? active : inactive}
        transform="skewX(-6)"
      ></use>
      <use
        href="#segment-x3"
        x="76"
        y="246"
        style={[99].includes(number) ? active : inactive}
        transform="skewX(-6)"
      ></use>
      <use
        href="#segment-x4"
        x="164"
        y="244"
        style={[99].includes(number) ? active : inactive}
        transform="skewX(-6)"
      ></use>
    </svg>
  );
};
