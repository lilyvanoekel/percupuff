export const Label: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span
    style={{
      fontSize: "12px",
      textTransform: "uppercase",
      maskSize: "24px",
    }}
  >
    {children}
  </span>
);
