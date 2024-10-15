import { css } from "@emotion/react";
import React, { memo } from "react";

export const KnobDial: React.FC<{ width: number; height: number }> = memo(
  ({ width, height }) => {
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
      const lineLength = longLineIndices.includes(i) ? 4 : 4;
      const lineOffset = longLineIndices.includes(i) ? 4 : 0;

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
          strokeWidth="1"
        />
      );
    }

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 120 120`}
        css={css("position: absolute; left: 0px; top: 0px;")}
      >
        <g>{lines}</g>
      </svg>
    );
  }
);
