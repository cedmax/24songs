const fs = require("fs");
const now = new Date();
let year = now.getFullYear();

let data;
let extraData;
try {
  data = require(`../src/data/${year}.json`);
  extraData = require(`../src/data/${year - 1}.json`);
} catch (e) {
  year = year - 1;
  data = require(`../src/data/${year}.json`);
  extraData = require(`../src/data/${year - 1}.json`);
}

fs.writeFileSync(
  "./functions/rss/data.json",
  JSON.stringify({ [year]: data, [year - 1]: extraData }),
  "utf-8"
);

const allSongs = [...data, ...extraData];
for (let i = 0; i < allSongs.length; i++) {
  const { id } = allSongs[i];
  try {
    fs.copyFileSync(`./public/lyrics/${id}.json`, `./functions/rss/${id}.json`);
  } catch (e) {}
}
