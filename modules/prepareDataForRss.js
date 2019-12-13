const fs = require("fs");
const now = new Date();
let year = now.getFullYear();

const addLyrics = data =>
  data.map(song => {
    let lyrics;
    try {
      lyrics = require(`../public/lyrics/${song.id}.json`).lyrics;
    } catch (e) {}

    return {
      ...song,
      lyrics
    };
  });

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

data = addLyrics(data);
extraData = addLyrics(extraData);

fs.writeFileSync(
  "./functions/rss/data.json",
  JSON.stringify({ [year]: data, [year - 1]: extraData }),
  "utf-8"
);
