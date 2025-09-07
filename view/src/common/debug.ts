// It can be hard to debug without a console log when using Cmajor. This will write values directly into the body instead.
export const nuclearDebug = (x: unknown) => {
  document.body.innerHTML =
    '<div style="height:400px; overflow: scroll;"><pre style="font-size: 24px; background: black; color: lime; padding: 20px;">DEBUG: ' +
    JSON.stringify(x, null, 2) +
    "</pre></div>";
};
