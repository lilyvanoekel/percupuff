import React from "react";
import { sixteenSegmentASCII } from "../../external/sixteenSegmentASCII";
import { SvgRasterizeAndCache } from "../SvgRasterizeAndCache";

const getSegmentValue = (char: string): number => {
  const asciiIndex = char.charCodeAt(0);

  if (asciiIndex >= 32 && asciiIndex <= 127) {
    return sixteenSegmentASCII[asciiIndex - 32];
  }

  return 0x0000;
};

const inactive: React.CSSProperties = {
  fill: "#393939",
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

const createSegment = (s: React.CSSProperties) => (i: number) => {
  const skew = "skewX(-6)";
  const sh = "#segment-h";
  const sv = "#segment-v";
  const v1 = "#segment-v1";
  const v2 = "#segment-v2";
  const h1 = "#segment-h1";
  const h2 = "#segment-h2";
  const x1 = "#segment-x1";
  const x2 = "#segment-x2";
  const x3 = "#segment-x3";
  const x4 = "#segment-x4";
  return [
    <use href={sh} x="56" y="0" style={s} key={i}></use>,
    <use href={sh} x="164" y="0" style={s} key={i}></use>,
    <use href={sv} x="250" y="30" transform={skew} style={s} key={i}></use>,
    <use href={sv} x="250" y="250" transform={skew} style={s} key={i}></use>,
    <use href={sh} x="121" y="440" style={s} key={i}></use>,
    <use href={sh} x="13" y="440" style={s} key={i}></use>,
    <use href={sv} x="30" y="250" transform={skew} style={s} key={i}></use>,
    <use href={sv} x="30" y="30" transform={skew} style={s} key={i}></use>,
    <use href={h1} x="61" y="220" style={s} transform={skew} key={i}></use>,
    <use href={h2} x="165" y="220" style={s} transform={skew} key={i}></use>,
    <use href={x1} x="76" y="48" style={s} transform={skew} key={i}></use>,
    <use href={v1} x="140" y="30" transform={skew} style={s} key={i}></use>,
    <use href={x2} x="164" y="49" style={s} transform={skew} key={i}></use>,
    <use href={x4} x="164" y="244" style={s} transform={skew} key={i}></use>,
    <use href={v2} x="140" y="250" transform={skew} style={s} key={i}></use>,
    <use href={x3} x="76" y="246" style={s} transform={skew} key={i}></use>,
  ][i];
};

export const SixteenSegmentSvg: React.FC<{
  color: "red" | "green";
  character?: string;
  width?: number;
  height?: number;
}> = ({ character, color, width = 160, height = 240 }) => {
  const active = color === "red" ? activeRed : activeGreen;

  const binaryNumber = getSegmentValue(character ?? " ");

  const convert = (i: number) =>
    [8, 15, 14, 13, 9, 12, 11, 10, 7, 6, 5, 4, 3, 2, 1, 0][i];

  const mask = binaryNumber & 0xffff;
  const activeSegments = [...Array(16).keys()]
    .filter((i) => mask & (1 << (15 - i)))
    .map(convert);

  const inActiveSegments = [...Array(16).keys()]
    .filter((i) => !(mask & (1 << (15 - i))))
    .map(convert);

  const createActiveSegment = createSegment(active);
  const createInactiveSegment = createSegment(inactive);

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
      {inActiveSegments.map(createInactiveSegment)}
      {activeSegments.map(createActiveSegment)}
    </svg>
  );
};

export const SixteenSegment: React.FC<{
  color: "red" | "green";
  character?: string;
  width?: number;
  height?: number;
}> = ({ character, color, width = 160, height = 240 }) => {
  const cacheKey = `${character}-${color}-${width}-${height}`;
  return (
    <SvgRasterizeAndCache
      cacheKey={cacheKey}
      width={width}
      height={height}
      backgroundColor="#222222"
    >
      <SixteenSegmentSvg
        color={color}
        character={character}
        width={width}
        height={height}
      />
    </SvgRasterizeAndCache>
  );
};
