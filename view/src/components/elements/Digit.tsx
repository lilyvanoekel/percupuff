import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

const inactive: React.CSSProperties = {
  fill: "#444444",
};

const activeGreen: React.CSSProperties = {
  fill: "rgba(0, 230, 0, 1)",
  filter: `drop-shadow(0 0 10px rgba(0, 230, 0, 0.8))
           drop-shadow(0 0 15px rgba(0, 230, 0, 0.7))
           drop-shadow(0 0 20px rgba(0, 230, 0, 0.9))`,
};

const activeRed: React.CSSProperties = {
  fill: "rgba(255, 50, 50, 1)",
  filter: `drop-shadow(0 0 10px rgba(255, 50, 50, 0.8))
           drop-shadow(0 0 15px rgba(255, 50, 50, 0.7))
           drop-shadow(0 0 20px rgba(255, 50, 50, 0.9))`,
};

export const DigitSvg: React.FC<{
  color: "red" | "green";
  number?: number;
  width?: number;
  height?: number;
}> = ({ number = -1, color, width = 160, height = 240 }) => {
  const active = color === "red" ? activeRed : activeGreen;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="-30 -30 320 540"
    >
      <defs>
        <g id="unit-h">
          <path d="M0 20 L20 40 L180 40 L200 20 L180 0 L20 0 Z"></path>
        </g>
        <g id="unit-v">
          <path d="M20 0 L0 20 L0 180 L20 200 L40 180 L40 20 Z"></path>
        </g>
      </defs>
      {/* Horizontal Segments */}
      <use
        href="#unit-h"
        className="segment a"
        x="56"
        y="0"
        style={[0, 2, 3, 5, 6, 7, 8, 9].includes(number) ? active : inactive}
      ></use>
      <use
        href="#unit-h"
        className="segment g"
        x="36"
        y="220"
        style={[2, 3, 4, 5, 6, 8, 9, -2].includes(number) ? active : inactive}
      ></use>
      <use
        href="#unit-h"
        className="segment d"
        x="13"
        y="440"
        style={[0, 2, 3, 5, 6, 8, 9].includes(number) ? active : inactive}
      ></use>

      {/* Slanted Vertical Segments */}
      <use
        href="#unit-v"
        className="segment b"
        x="250"
        y="30"
        transform="skewX(-6)"
        style={[0, 1, 2, 3, 4, 7, 8, 9].includes(number) ? active : inactive}
      ></use>
      <use
        href="#unit-v"
        className="segment c"
        x="250"
        y="250"
        transform="skewX(-6)"
        style={[0, 1, 3, 4, 5, 6, 7, 8, 9].includes(number) ? active : inactive}
      ></use>
      <use
        href="#unit-v"
        className="segment e"
        x="30"
        y="250"
        transform="skewX(-6)"
        style={[0, 2, 6, 8].includes(number) ? active : inactive}
      ></use>
      <use
        href="#unit-v"
        className="segment f"
        x="30"
        y="30"
        transform="skewX(-6)"
        style={[0, 4, 5, 6, 8, 9].includes(number) ? active : inactive}
      ></use>
    </svg>
  );
};

const defaultBlackPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const imageCache = new Map<string, string>();

export const Digit: React.FC<{
  color: "red" | "green";
  number?: number | "-";
  width?: number;
  height?: number;
}> = ({ number = -1, color, width = 160, height = 240 }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(defaultBlackPixel);

  useEffect(() => {
    const cacheKey = `${number}-${color}-${width}-${height}`;

    if (imageCache.has(cacheKey)) {
      const cachedImageSrc = imageCache.get(cacheKey);
      setImageSrc(cachedImageSrc || defaultBlackPixel);
      return;
    }

    const svgString = ReactDOMServer.renderToStaticMarkup(
      <DigitSvg
        number={number == "-" ? -2 : number}
        color={color}
        width={width}
        height={height}
      />
    );

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { alpha: false });

      if (ctx) {
        ctx.fillStyle = "#222222";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(image, 0, 0, width, height);
      }

      const dataUrl = canvas.toDataURL();
      imageCache.set(cacheKey, dataUrl);
      setImageSrc(dataUrl);
      URL.revokeObjectURL(url);
    };

    image.src = url;
  }, [number, color, width, height]);

  return (
    <img
      src={imageSrc || defaultBlackPixel}
      width={width}
      height={height}
      alt={`Digit ${number}`}
    />
  );
};
