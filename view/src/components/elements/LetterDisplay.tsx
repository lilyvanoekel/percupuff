import { InlineBlock } from "./InlineBlock";
import { SixteenSegment } from "./SixteenSegment";

export const LetterDisplay: React.FC<{
  letterWidth: number;
  letterHeight: number;
  lineLength: number;
  numberOfLines: number;
  text?: string[];
  color: "green" | "red";
  align?: "left" | "right" | "center";
  style?: React.CSSProperties;
}> = ({
  letterWidth,
  letterHeight,
  lineLength,
  numberOfLines,
  text,
  color,
  align,
  style,
}) => {
  return (
    <InlineBlock
      style={{
        lineHeight: "0",
        background: "#222222",
        border: "1px solid #333333",
        padding: `4px`,
        boxShadow: "1px 1px 3px 0px #000000 inset",
        position: "relative",
        ...style,
      }}
    >
      {[...Array(numberOfLines).keys()].map((lineIndex) => {
        const lineText = text?.[lineIndex] || "";
        let paddingSpaces = "";

        if (align === "right" && lineText.length < lineLength) {
          paddingSpaces = " ".repeat(lineLength - lineText.length);
        } else if (align === "center" && lineText.length < lineLength) {
          const totalPadding = lineLength - lineText.length;
          const leftPadding =
            lineIndex % 2
              ? Math.ceil(totalPadding / 2)
              : Math.floor(totalPadding / 2);
          paddingSpaces = " ".repeat(leftPadding);
        }

        const fullLineText =
          align === "right" || align === "center"
            ? paddingSpaces + lineText
            : lineText;

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
