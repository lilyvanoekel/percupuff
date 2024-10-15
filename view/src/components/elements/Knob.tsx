import React, { useRef, useState } from "react";
// import { css } from "@emotion/react";

export const KnobOld: React.FC<{ value: number }> = ({
  value: initialValue,
}) => {
  const [value, setValue] = useState(initialValue);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (lastPosRef.current === null) return;

    const deltaX =
      (e.clientX - lastPosRef.current.x) / (window.innerWidth * 0.5);
    const deltaY =
      (lastPosRef.current.y - e.clientY) / (window.innerHeight * 0.5);

    const deltaValue = (deltaY + deltaX) * 100;

    setValue((prev) => Math.min(100, Math.max(0, prev + deltaValue)));

    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    lastPosRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    lastPosRef.current = { x: touch.clientX, y: touch.clientY }; // Track touch start position
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (lastPosRef.current === null) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastPosRef.current.x;
    const deltaY = lastPosRef.current.y - touch.clientY;

    const deltaValue = (deltaY + deltaX) * 0.1; // Adjust for touch sensitivity
    setValue((prev) => Math.min(100, Math.max(0, prev + deltaValue))); // Clamp value

    lastPosRef.current = { x: touch.clientX, y: touch.clientY }; // Update last position
  };

  const handleTouchEnd = () => {
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
    lastPosRef.current = null;
  };

  const lines = [];
  const numLines = 21;
  const radius = 55;

  const lineColor = "white";
  const gapWidth = 90;
  const center = 60;

  const totalAngle = 360 - gapWidth;
  const angleStep = totalAngle / numLines;
  const longLineIndices = [
    0,
    Math.floor(numLines * 0.2),
    Math.floor(numLines * 0.4),
    Math.floor(numLines * 0.6),
    Math.floor(numLines * 0.8),
    20,
  ];

  for (let i = 0; i < numLines; i++) {
    let angle = i * angleStep;
    angle += 90 + gapWidth * 0.5 + angleStep * 0.5;
    const lineLength = longLineIndices.includes(i) ? 5 : 5;
    const lineOffset = longLineIndices.includes(i) ? 5 : 0;

    const radians = (angle * Math.PI) / 180;
    const x1 = center + (radius + lineOffset) * Math.cos(radians);
    const y1 = center + (radius + lineOffset) * Math.sin(radians);
    const x2 = center + (radius - lineLength) * Math.cos(radians);
    const y2 = center + (radius - lineLength) * Math.sin(radians);

    lines.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={lineColor}
        strokeWidth="2"
      />
    );
  }

  let angle = (value / 100) * (270 - angleStep);
  angle += 90 + gapWidth * 0.5 + angleStep * 0.5;
  //   const radians = (angle * Math.PI) / 180;
  //   const indicatorLocationRadius = 34;
  //   const indicatorRadius = 4;
  //   const indicatorX =
  //     center +
  //     (indicatorLocationRadius - indicatorRadius * 0.5) * Math.cos(radians);
  //   const indicatorY =
  //     center +
  //     (indicatorLocationRadius - indicatorRadius * 0.5) * Math.sin(radians);

  //   const activeGreen = css({
  //     fill: "rgba(0, 230, 0, 1)",
  //     filter: `drop-shadow(0 0 2px rgba(0, 230, 0, 0.8))
  //              drop-shadow(0 0 4px rgba(0, 230, 0, 0.7))
  //              drop-shadow(0 0 6px rgba(0, 230, 0, 0.9))`,
  //   });

  angle += 180;
  angle = angle % 360;

  return (
    <div>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <g>{lines}</g>
        {/* <circle
          cx="60"
          cy="60"
          r="40"
          fill="url(#knobGradient)"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="0"
        /> */}
        {/* <circle
          cx={indicatorX}
          cy={indicatorY}
          r={indicatorRadius}
          css={activeGreen}
        /> */}

        <path
          id="path1"
          transform={`translate(27.5, 30) scale(0.6) rotate(${angle}, 54.5, 49.5)`}
          style={{
            fill: "#000000",
            filter: `drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 3px rgba(255, 255, 255, 1.0))`,
            fillRule: "evenodd",
            stroke: "#000000",
            strokeWidth: 0.12719,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          d="M 27.408632,97.1325 C 19.490423,92.53809 18.294091,81.26516 13.736617,73.33161 9.179092,65.39796 0.03919895,58.67794 0.06364395,49.53085 0.08807395,40.3838 9.263586,33.711858 13.863536,25.802337 18.463457,17.892832 19.720452,6.6264319 27.663237,2.0737779 c 7.942795,-4.552651 18.314821,0.04817 27.472217,0.07226 9.1574,0.02409 19.55391,-4.522107 27.47221,0.07227 7.91832,4.59438 9.115,15.8672191 13.67252,23.8008261 4.557486,7.933596 13.696976,14.653766 13.672496,23.800766 -0.0245,9.14702 -9.19981,15.81901 -13.799706,23.72852 -4.59991,7.90952 -5.85691,19.17593 -13.79971,23.7286 -7.94278,4.55266 -18.31481,-0.0482 -27.472217,-0.0723 -9.157475,-0.0241 -19.554074,4.52221 -27.472415,-0.0723 z"
        />
        <rect
          style={{
            fill: "#ffffff",
            fillOpacity: 1,
            fillRule: "evenodd",
            stroke: "#000000",
            strokeWidth: 0.132,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
          transform={`translate(27.5, 30) scale(0.6) rotate(${angle}, 54.5, 49.5)`}
          id="rect2"
          width="33.485294"
          height="5.8235292"
          x="0.99469805"
          y="46.428532"
          ry="2.9117646"
        />
      </svg>
    </div>
  );
};
