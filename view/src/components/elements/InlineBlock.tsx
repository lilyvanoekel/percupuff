export const InlineBlock: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({ children, style, onClick }) => (
  <div
    style={{ display: "inline-block", verticalAlign: "top", ...style }}
    onClick={onClick}
  >
    {children}
  </div>
);
