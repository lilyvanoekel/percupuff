import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { KnobDial } from "./KnobDial";

export const Knob: React.FC<{
  value: number;
  setValue: (value: number) => void;
  width?: number;
  height?: number;
}> = ({ value, width, height, setValue }) => {
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const valueRef = useRef<number | null>(null);

  width = width || 120;
  height = height || 120;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lastPosRef.current === null || valueRef.current === null) {
        return;
      }

      const deltaX = (e.clientX - lastPosRef.current.x) / (width * 1.5);
      const deltaY = (lastPosRef.current.y - e.clientY) / (height * 1.5);

      const deltaValue = (deltaY + deltaX) * 100;

      setValue(Math.min(100, Math.max(valueRef.current + deltaValue, 0)));
    };

    const handleMouseUp = () => {
      lastPosRef.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (lastPosRef.current === null || valueRef.current === null) {
        return;
      }

      const touch = e.touches[0];
      const deltaX = touch.clientX - lastPosRef.current.x;
      const deltaY = lastPosRef.current.y - touch.clientY;

      const deltaValue = (deltaY + deltaX) * 0.1;
      setValue(Math.min(100, Math.max(valueRef.current + deltaValue, 0)));

      lastPosRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = () => {
      lastPosRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    valueRef.current = value;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    lastPosRef.current = { x: touch.clientX, y: touch.clientY };
    valueRef.current = value;
  };

  const numLines = 21;
  const gapWidth = 90;
  const totalAngle = 360 - gapWidth;
  const angleStep = totalAngle / numLines;

  let angle = (value / 100) * (270 - angleStep);
  angle += 90 + gapWidth * 0.5 + angleStep * 0.5;

  angle += 180;
  angle = angle % 360;

  // Adjust for the knob's size discrepancy within the SVG
  const knobWidth = 109.89 * (width / 120);
  const knobHeight = 99.22 * (height / 120);
  const knobMarginX = width / 6;
  const knobMarginY = height / 6;
  const knobWidthDifference = width - knobWidth;
  const knobHeightDifference = height - knobHeight;
  const knobLeftAdjustment = knobWidthDifference * 0.5 - knobMarginX;
  const knobTopAdjustment = knobHeightDifference * 0.5 - knobMarginY;
  const originX = knobWidth * 0.5 + knobMarginX;
  const originY = knobHeight * 0.5 + knobMarginY;

  return (
    <div
      css={css(`
      position: relative;
      width: ${width}px;
      height: ${height}px;
    `)}
    >
      <KnobDial width={width} height={height} />
      <svg
        width={width}
        height={height}
        viewBox="0 0 120 120"
        style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          cursor: "move",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* <g>{lines}</g> */}
        <circle
          cx="60"
          cy="60"
          r="46"
          fill="url(#knobGradient)"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="0"
        />
        {/* Making sure the below commented code gets committed at least once */}
        {/* <path
          id="path1"
          style={{
            fill: "#000000",
            filter: `drop-shadow(0 0 3px rgba(255, 255, 255, 1.0))`,
            stroke: "#DDDDDD",
            strokeWidth: 1,
            transformOrigin: "54.5px 49.5px",
            transform: `translate(6px, 10px) rotate(${Math.round(
              angle
            )}deg) scale(0.6)`,
          }}
          d="M 27.408632,97.1325 C 19.490423,92.53809 18.294091,81.26516 13.736617,73.33161 9.179092,65.39796 0.03919895,58.67794 0.06364395,49.53085 0.08807395,40.3838 9.263586,33.711858 13.863536,25.802337 18.463457,17.892832 19.720452,6.6264319 27.663237,2.0737779 c 7.942795,-4.552651 18.314821,0.04817 27.472217,0.07226 9.1574,0.02409 19.55391,-4.522107 27.47221,0.07227 7.91832,4.59438 9.115,15.8672191 13.67252,23.8008261 4.557486,7.933596 13.696976,14.653766 13.672496,23.800766 -0.0245,9.14702 -9.19981,15.81901 -13.799706,23.72852 -4.59991,7.90952 -5.85691,19.17593 -13.79971,23.7286 -7.94278,4.55266 -18.31481,-0.0482 -27.472217,-0.0723 -9.157475,-0.0241 -19.554074,4.52221 -27.472415,-0.0723 z"
        />
        <rect
          style={{
            fill: "#ffffff",
            fillOpacity: 1,
            fillRule: "evenodd",
            transformOrigin: "54.5px 49.5px",
            transform: `translate(6px, 10px) rotate(${Math.round(
              angle
            )}deg) scale(0.6)`,
          }}
          id="rect2"
          width="33.485294"
          height="5.8235292"
          x="0.99469805"
          y="46.428532"
          ry="2.9117646"
        /> */}
      </svg>
      <div
        css={css(`
          position: absolute;
          left: ${knobLeftAdjustment}px;
          top: ${knobTopAdjustment}px;
          transform-origin: ${originX}px ${originY}px;
          transform: rotate(${angle}deg) scale(0.6);
          cursor: move;
        `)}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <svg
          width={width + width / 3}
          height={height + height / 3}
          viewBox="-20 -20 160 160"
        >
          <path
            style={{
              fill: "#000000",
              filter: `drop-shadow(0 0 3px rgba(255, 255, 255, 1.0))`,
            }}
            d="M 27.408632,97.1325 C 19.490423,92.53809 18.294091,81.26516 13.736617,73.33161 9.179092,65.39796 0.03919895,58.67794 0.06364395,49.53085 0.08807395,40.3838 9.263586,33.711858 13.863536,25.802337 18.463457,17.892832 19.720452,6.6264319 27.663237,2.0737779 c 7.942795,-4.552651 18.314821,0.04817 27.472217,0.07226 9.1574,0.02409 19.55391,-4.522107 27.47221,0.07227 7.91832,4.59438 9.115,15.8672191 13.67252,23.8008261 4.557486,7.933596 13.696976,14.653766 13.672496,23.800766 -0.0245,9.14702 -9.19981,15.81901 -13.799706,23.72852 -4.59991,7.90952 -5.85691,19.17593 -13.79971,23.7286 -7.94278,4.55266 -18.31481,-0.0482 -27.472217,-0.0723 -9.157475,-0.0241 -19.554074,4.52221 -27.472415,-0.0723 z"
          />
          <rect
            style={{
              fill: "#ffffff",
              fillOpacity: 1,
              fillRule: "evenodd",
            }}
            width="33.485294"
            height="5.8235292"
            x="0.99469805"
            y="46.428532"
            ry="2.9117646"
          />
        </svg>
      </div>
    </div>
  );
};
