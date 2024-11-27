require("dotenv").config();

const axios = require("axios");
const cheerio = require("cheerio");
const logUpdate = require("log-update");
const fs = require("fs");
const getExtendedData = require("./lib/getExtendedData");
const prettier = require("prettier");

const { initialYear } = require("./config.json");
const chalk = require("chalk");
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

let config = {
  method: "get",
  maxBodyLength: Infinity,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:128.0) Gecko/20100101 Firefox/128.0",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/jxl,image/webp,image/png,image/svg+xml,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    Connection: "keep-alive",
    Cookie: process.env.COOKIE,
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "cross-site",
    "Sec-GPC": "1",
    Priority: "u=0, i",
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
  },
};

console.log(process.env.COOKIE);

async function fetch(fileName, all, arr, year, page = 1) {
  if (!fs.existsSync(fileName)) {
    const { data } = await axios({
      ...config,
      url: `https://www.last.fm/user/cedmax/library/tracks?from=${year}-01-01&rangetype=year&page=${page}`,
    });

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

    let filtered = uniq(all, [...arr, ...songs]);

    logUpdate(`year: ${year}, page: ${page}, found: ${filtered.length}`);

    if (filtered.length < 24) {
      return fetch(fileName, all, filtered, year, ++page);
    } else {
      logUpdate.done();
      filtered.length = 24;
      all.push(...filtered);
      return filtered;
    }
  } else {
    const data = require(`../${fileName}`);
    all.push(...data);
    return data.reverse();
  }
}

(async () => {
  const all = [];
  for (let year = initialYear; year <= new Date().getFullYear(); year++) {
    console.log(chalk.hex(`#ff0`)(year));
    const fileName = `./src/data/${year}.json`;

    const data = await fetch(fileName, all, [], year);
    const dataToSave = await getExtendedData(data);

    fs.writeFileSync(
      fileName,
      prettier.format(JSON.stringify(dataToSave.reverse()), {
        parser: "json",
        tabWidth: 4,
      }),
      "utf8"
    );
  }
})();
