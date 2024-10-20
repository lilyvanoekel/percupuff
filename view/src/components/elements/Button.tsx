import { HSL } from "../../common/color/hsl";
import { InlineBlock } from "./InlineBlock";

export const Button: React.FC<{
  glowColor: HSL;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ glowColor, width = 80, height = 80, style, children }) => {
  const moat = height / 18;
  const borderWidthTopRight = height / 14;
  const borderWidthBottomLeft = height / 16;
  const borderRadius = height / 4;
  return (
    <InlineBlock style={{ position: "relative", cursor: "pointer", ...style }}>
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter
            id="blurFilter"
            x={-moat}
            y={-moat}
            width={width}
            height={height}
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
          <clipPath id="outer">
            <rect
              x="1"
              y="1"
              width={width - 2}
              height={height - 2}
              rx={borderRadius - 1}
              ry={borderRadius - 1}
            />
          </clipPath>
          <radialGradient id="borderGradient1" cx="0" cy={0} r="25%">
            <stop offset="0%" stopColor="#444444" />
            <stop offset="100%" stopColor="#111111" />
          </radialGradient>
          <linearGradient
            id="borderGradient2"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="80%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient
            id="borderGradient3"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
            <stop offset="10%" stopColor="rgba(0,0,0,0)" />
            <stop offset="90%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
          </linearGradient>
          <linearGradient
            id="borderGradient4"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
            <stop offset="4%" stopColor="rgba(0,0,0,0)" />
            <stop offset="90%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          rx={borderRadius}
          ry={borderRadius}
          fill="#333333"
        />
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          rx={borderRadius - 1}
          ry={borderRadius - 1}
          fill="black"
        />
        <rect
          x={moat}
          y={moat}
          width={width - moat * 2}
          height={height - moat * 2}
          rx={borderRadius * 0.9}
          ry={borderRadius * 0.9}
          fill={glowColor.toString()}
          filter="url(#blurFilter)"
          clipPath="url(#outer)"
        />
        <rect
          x={moat}
          y={moat}
          width={width - moat * 2}
          height={height - moat * 2}
          rx={borderRadius * 0.9}
          ry={borderRadius * 0.9}
          fill="url(#borderGradient1)"
        />
        <rect
          x={moat}
          y={moat}
          width={width - moat * 2}
          height={height - moat * 2}
          rx={borderRadius * 0.9}
          ry={borderRadius * 0.9}
          fill="url(#borderGradient2)"
        />
        <rect
          x={moat}
          y={moat}
          width={width - moat * 2}
          height={height - moat * 2}
          rx={borderRadius * 0.9}
          ry={borderRadius * 0.9}
          fill="url(#borderGradient3)"
        />
        <rect
          x={moat}
          y={moat}
          width={width - moat * 2}
          height={height - moat * 2}
          rx={borderRadius * 0.9}
          ry={borderRadius * 0.9}
          fill="url(#borderGradient4)"
        />
        <rect
          x={moat + borderWidthBottomLeft}
          y={moat + borderWidthTopRight}
          width={width - moat * 2 - borderWidthBottomLeft - borderWidthTopRight}
          height={
            height -
            moat * 2 -
            borderWidthBottomLeft -
            borderWidthTopRight -
            moat
          }
          rx={borderRadius * 0.5}
          ry={borderRadius * 0.5}
          fill="#444444"
        />
        <rect
          x={moat + borderWidthBottomLeft + 1}
          y={moat + borderWidthTopRight + 1}
          width={
            width - moat * 2 - borderWidthBottomLeft - borderWidthTopRight - 2
          }
          height={
            height - moat * 2 - borderWidthBottomLeft - borderWidthTopRight - 1
          }
          rx={borderRadius * 0.5}
          ry={borderRadius * 0.5}
          fill="#222222"
        />
      </svg>
      <div style={{ position: "absolute", left: "0", top: "0" }}>
        {children}
      </div>
    </InlineBlock>
  );
};
