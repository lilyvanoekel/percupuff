export const InlineBlock: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div style={{ display: "inline-block", verticalAlign: "top", ...style }}>
    {children}
  </div>
);
