const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const getYoutubeData = require("./lib/getYoutubeData");
const getLyrics = require("./lib/getLyrics");
const handleImages = require("./lib/handleImages");
const { initialYear } = require("./config.json");

const getText = ($, selector) => $.find(selector).text().trim();

const uniq = (all, arr) =>
  arr
    .filter(
      item => !all.find(i => i.artist === item.artist && i.title === item.title)
    )
    .filter(
      (obj, pos, arr) =>
        arr.map(mapObj => mapObj.artist).indexOf(obj.artist) === pos
    );

async function fetch(all, arr, year, page = 1) {
  const fileName = `./src/data/${year}.json`;
  if (!fs.existsSync(fileName)) {
    const { data } = await axios.get(
      `https://www.last.fm/user/cedmax/library/tracks?from=${year}-01-01&rangetype=year&page=${page}`
    );

    const $ = cheerio.load(data);
    const songs = $(".chartlist-row--with-artist")
      .toArray()
      .map(songDOM => {
        const $song = $(songDOM);
        return {
          img: $song.find(".chartlist-image img").attr("src"),
          title: getText($song, ".chartlist-name"),
          artist: getText($song, ".chartlist-artist"),
        };
      });

    const filtered = uniq(all, [...arr, ...songs]);
    console.log(year, page, filtered.length);
    if (filtered.length < 24) {
      return fetch(all, filtered, year, ++page);
    } else {
      filtered.length = 24;
      all.push(...filtered);
      for (let i = 0; i < filtered.length; i++) {
        const { artist, title } = filtered[i];
        filtered[i].video = await getYoutubeData(artist, title);
      }

      const dataToSave = await handleImages(filtered);

      fs.writeFileSync(
        fileName,
        JSON.stringify(dataToSave.reverse(), null, 4),
        "utf-8"
      );
    }
  } else {
    const data = require(`../${fileName}`);
    all.push(...data);
  }
}

(async () => {
  const all = [];
  for (let year = initialYear; year <= new Date().getFullYear(); year++) {
    await fetch(all, [], year);
    await getLyrics(require(`../src/data/${year}.json`));
  }
})();
