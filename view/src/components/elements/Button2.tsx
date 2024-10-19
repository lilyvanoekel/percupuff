export const Button2: React.FC<{
  width?: number;
  height?: number;
}> = ({ width = 50, height = 70 }) => {
  const moat = height / 20;
  const borderRadius = height / 3.5;
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="borderGradient3a" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.0)" />
          <stop offset="10%" stopColor="rgba(0,0,0,0)" />
          <stop offset="90%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
        </linearGradient>
        <filter id="rounded-shadow">
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
      <rect
        x={moat}
        y={moat}
        width={width - moat * 2}
        height={height - moat * 2}
        rx={borderRadius * 0.8}
        ry={borderRadius * 0.8}
        fill="rgb(50, 123, 50)"
        // fill="rgb(100, 255, 100)"
        filter="url(#rounded-shadow)"
      />
      <rect
        x={moat}
        y={moat}
        width={width - moat * 2}
        height={height - moat * 2}
        rx={borderRadius * 0.8}
        ry={borderRadius * 0.8}
        fill="url(#borderGradient3a)"
      />
    </svg>
  );
};
