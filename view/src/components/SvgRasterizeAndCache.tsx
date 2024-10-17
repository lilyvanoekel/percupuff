import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";

const defaultPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

const imageCache = new Map<string, string>();

export const SvgRasterizeAndCache: React.FC<{
  cacheKey: string;
  width: number;
  height: number;
  backgroundColor?: string;
  alpha?: boolean;
  alt?: string;
  children: React.ReactNode;
}> = ({
  cacheKey,
  width,
  height,
  backgroundColor,
  alpha = false,
  alt = "Rasterized SVG",
  children,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(defaultPixel);

  useEffect(() => {
    const cachedImageSrc = imageCache.get(cacheKey);
    if (cachedImageSrc) {
      setImageSrc(cachedImageSrc);
      return;
    }

    const svgString = ReactDOMServer.renderToStaticMarkup(children);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { alpha });

      if (ctx) {
        if (backgroundColor) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, width, height);
        }
        ctx.drawImage(image, 0, 0, width, height);
      }

      const dataUrl = canvas.toDataURL();
      imageCache.set(cacheKey, dataUrl);
      setImageSrc(dataUrl);
      URL.revokeObjectURL(url);
    };

    image.src = url;
  }, [cacheKey, width, height, children]);

  return <img src={imageSrc} width={width} height={height} alt={alt} />;
};
