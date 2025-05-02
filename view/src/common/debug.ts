export const nuclearDebug = (x: unknown) => {
  document.body.innerHTML =
    '<div style="height:400px; overflow: scroll;"><pre style="font-size: 24px; background: black; color: lime; padding: 20px;">DEBUG: ' +
    JSON.stringify(x, null, 2) +
    "</pre></div>";
};
