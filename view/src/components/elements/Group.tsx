import React, { useRef, useEffect, useState } from "react";
import { ParamKnob } from "./ParamKnob";

export const Group: React.FC<{
  width?: string;
  height?: string;
  text?: string;
}> = ({ width = "400px", height = "200px", text = "Accoustic Bassdrum" }) => {
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
      setTextHeight(textRef.current.offsetHeight);
    }
  }, [text]);

  const fontSize = 14;
  const padding = fontSize * 0.25;
  const topHeight = textHeight / 2;

  const clipPath = `polygon(
    0 0, 
    calc(${fontSize * 2 - padding}px) 0, 
    calc(${fontSize * 2 - padding}px) ${topHeight}px, 
    calc(${textWidth + fontSize * 2 + padding}px) ${topHeight}px, 
    calc(${textWidth + fontSize * 2 + padding}px) 0, 
    100% 0, 
    100% 100%, 
    0 100%
  )`;

  return (
    <div
      style={{
        width: width,
        height: height,
        boxSizing: "border-box",
        position: "relative",
        marginTop: "100px",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: width,
          height: height,
          border: "2px solid #444444",
          borderRadius: "10px",
          boxSizing: "border-box",
          clipPath: clipPath,
          position: "absolute",
          top: "0",
          left: "0",
        }}
      ></div>
      <span
        ref={textRef}
        className="noise-mask"
        style={{
          position: "absolute",
          top: `-${textHeight / 2}px`,
          left: `${fontSize * 2}px`,
          padding: `0 ${padding}px`,
          whiteSpace: "nowrap",
          fontSize: `${fontSize}px`,
          zIndex: 1,
          color: "white",
          textTransform: "uppercase",
          maskSize: `${fontSize * 2}px`,
        }}
      >
        {text}
      </span>
      <div>
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            textTransform: "uppercase",
            lineHeight: "28px",
            maskSize: "24px",
            width: "90px",
          }}
          className="noise-mask"
        >
          Main Volume
        </div>
        <ParamKnob param="mainLevel" width={90} height={115.5} />
      </div>
    </div>
  );
};
