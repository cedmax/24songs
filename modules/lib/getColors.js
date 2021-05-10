const Vibrant = require("node-vibrant");
const chalk = require("chalk");
const getPalette = async file => new Vibrant.from(file).getPalette();

module.exports = async (imgPath, logger) => {
  const { Vibrant, Muted, LightMuted, DarkMuted } = await getPalette(imgPath);

  const palette = [DarkMuted, Vibrant, Muted, LightMuted].map(i =>
    i.rgb.map(e => Math.round(e))
  );

  logger(
    `${[DarkMuted, Vibrant, Muted, LightMuted]
      .map(i => chalk.bgHex(i.hex).bold(i.hex))
      .join(", ")}`
  );

  return palette;
};
