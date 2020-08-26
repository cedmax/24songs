import "css-paint-polyfill";

export const props = {
  "--background": "rgb(0, 74, 30)",
  "--main": "rgb(200, 20, 36)",
  "--accent": "rgb(0, 95, 28)",
  "--secondary": "rgb(0, 129, 45)",
};

export const setup = () => {
  Object.keys(props).forEach(prop => {
    CSS.registerProperty({
      name: prop,
      syntax: "<color>",
      inherits: false,
      initialValue: props[prop],
    });
  });

  CSS.paintWorklet.addModule("/cssWorker.js");
};
