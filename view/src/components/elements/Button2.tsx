import { useId } from "react";
import { HSL } from "../../common/color/hsl";
import { InlineBlock } from "./InlineBlock";

export const Button2: React.FC<{
  color: HSL;
  width?: number;
  height?: number;
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}> = ({ color, width = 50, height = 70, active = false, onClick, style }) => {
  const id = useId();

  const c = HSL(
    color.h,
    active ? 100 : color.s,
    active ? color.l + 40 : color.l
  );

  const moat = height / 20;
  const borderRadius = height / 3.5;
  const blurMargin = 4;
  return (
    <InlineBlock
      style={{
        width: `${width}px`,
        height: `${height}px`,
        cursor: "pointer",
        position: "relative",
        ...style,
      }}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      <svg
        width={width + blurMargin * 2}
        height={height + blurMargin * 2}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`-${blurMargin} -${blurMargin} ${width + blurMargin * 2} ${
          height + blurMargin * 2
        }`}
        style={{
          position: "absolute",
          left: `-${blurMargin}px`,
          top: `-${blurMargin}px`,
          zIndex: active ? "2" : "1",
        }}
      >
        <defs>
          <linearGradient
            id={`borderGradient${id}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(0,0,0,0.0)" />
            <stop offset="10%" stopColor="rgba(0,0,0,0)" />
            <stop offset="90%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
          </linearGradient>
          <filter id={`roundedShadow${id}`}>
            <feFlood floodColor="black" />
            <feComposite operator="out" in2="SourceGraphic" />
            <feMorphology operator="dilate" radius="2" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite operator="atop" in2="SourceGraphic" />
          </filter>
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
        {active ? (
          <rect
            x={moat}
            y={moat}
            width={width - moat * 2}
            height={height - moat * 2}
            rx={borderRadius * 0.8}
            ry={borderRadius * 0.8}
            fill={c.toString()}
            style={{ filter: "blur(4px)" }}
          />
        ) : null}
        <rect
          x={moat}
          y={moat}
          width={width - moat * 2}
          height={height - moat * 2}
          rx={borderRadius * 0.8}
          ry={borderRadius * 0.8}
          fill={c.toString()}
          // fill="rgb(100, 255, 100)"
          filter={`url(#roundedShadow${id})`}
        />
        <rect
          x={moat}
          y={moat}
          width={width - moat * 2}
          height={height - moat * 2}
          rx={borderRadius * 0.8}
          ry={borderRadius * 0.8}
          fill={`url(#borderGradient${id})`}
        />
      </svg>
    </InlineBlock>
  );
};
