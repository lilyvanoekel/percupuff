import { Digit } from "./Digit";
import { InlineBlock } from "./InlineBlock";

const getLastXDigits =
  (x: number) =>
  (num: number): (number | undefined)[] => {
    const numStr = num.toString();
    const lastXDigits = numStr.slice(-x).split("");
    return Array(x - lastXDigits.length)
      .fill(undefined)
      .concat(lastXDigits.map((digit) => Number(digit)));
  };

export const DigitDisplay: React.FC<{
  digitWidth: number;
  digitHeight: number;
  lineLength: number;
  number: number;
  color: "green" | "red";
}> = ({ digitWidth, digitHeight, lineLength, number, color }) => {
  const digits = getLastXDigits(lineLength)(number);
  return (
    <InlineBlock
      style={{
        lineHeight: "0",
        background: "#222222",
        border: "1px solid #333333",
        padding: `4px`,
        boxShadow: "1px 1px 3px 0px #000000 inset",
        position: "relative",
      }}
    >
      {[...Array(lineLength).keys()].map((digitIndex) => (
        <Digit
          key={digitIndex}
          number={digits[digitIndex]}
          color={color}
          width={digitWidth}
          height={digitHeight}
        />
      ))}
      <div
        className="glass"
        style={{
          width: "calc(100% - 2px)",
          height: "calc(100% - 2px)",
          position: "absolute",
          left: "1px",
          top: "1px",
        }}
      ></div>
    </InlineBlock>
  );
};
