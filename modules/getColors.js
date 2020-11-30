const fs = require("fs");
const Vibrant = require("node-vibrant");
const { initialYear } = require("./config.json");

const getPalette = async file => new Vibrant.from(file).getPalette();

const fetch = async (year, items) => {
  if (!items[0].palette) {
    const newItems = [];
    for (const item of items) {
      const { Vibrant, Muted, LightMuted, DarkMuted } = await getPalette(
        `./public/images/${item.id}.jpg`,
        4,
        5
      );
      const palette = [DarkMuted, Vibrant, Muted, LightMuted].map(i =>
        i.rgb.map(e => Math.round(e))
      );
      newItems.push({
        ...item,
        palette,
      });
    }
    fs.writeFileSync(
      `./src/data/${year}.json`,
      JSON.stringify(newItems, null, 4),
      "utf-8"
    );
  }
};

(async () => {
  for (let year = initialYear; year <= new Date().getFullYear(); year++) {
    if (fs.existsSync(`./src/data/${year}.json`)) {
      await fetch(year, require(`../src/data/${year}.json`));
    }
  }
})();
