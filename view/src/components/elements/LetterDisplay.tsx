import { InlineBlock } from "./InlineBlock";
import { SixteenSegment } from "./SixteenSegment";

export const LetterDisplay: React.FC<{
  letterWidth: number;
  letterHeight: number;
  lineLength: number;
  numberOfLines: number;
  text: string[];
  color: "green" | "red";
  align?: "left" | "right";
}> = ({
  letterWidth,
  letterHeight,
  lineLength,
  numberOfLines,
  text,
  color,
  align,
}) => {
  return (
    <InlineBlock
      style={{
        lineHeight: "0",
        background: "#222222",
        border: "1px solid #333333",
        padding: `4px`,
        boxShadow: "1px 1px 3px 0px #000000 inset",
        // width: `${letterWidth * lineLength + 8}px`,
        // boxSizing: "border-box",
        position: "relative",
      }}
    >
      {[...Array(numberOfLines).keys()].map((lineIndex) => {
        const lineText = text[lineIndex] || "";
        const paddingSpaces =
          align === "right" && lineText.length < lineLength
            ? " ".repeat(lineLength - lineText.length)
            : "";
        const fullLineText =
          align === "right" ? paddingSpaces + lineText : lineText;

        return (
          <div key={lineIndex} style={{ display: "flex" }}>
            {[...Array(lineLength).keys()].map((letterIndex) => (
              <SixteenSegment
                key={`${lineIndex}_${letterIndex}`}
                color={color}
                character={fullLineText[letterIndex] || " "}
                width={letterWidth}
                height={letterHeight}
              />
            ))}
          </div>
        );
      })}
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
