const axios = require('axios');
const cheerio = require('cheerio');
const getYoutubeData = require('./getYoutubeData');
const fs = require('fs');
const handleImages = require('./handleImages');
const initialYear = 2006;

const getText = ($, selector) =>
  $.find(selector)
    .text()
    .trim();

const uniq = (arr, prop) =>
  arr.filter(
    (obj, pos, arr) =>
      arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  );

async function fetch(arr, year, page = 1) {
  const { data } = await axios.get(
    `https://www.last.fm/user/cedmax/library/tracks?from=${year}-01-01&rangetype=year&page=${page}`
  );

  const $ = cheerio.load(data);
  const songs = $('.chartlist-row--with-artist')
    .toArray()
    .map(songDOM => {
      const $song = $(songDOM);
      return {
        img: $song.find('.chartlist-image img').attr('src'),
        title: getText($song, '.chartlist-name'),
        artist: getText($song, '.chartlist-artist'),
      };
    });

  const filtered = uniq([...arr, ...songs], 'artist');
  console.log(year, page, filtered.length);
  if (filtered.length < 24) {
    return fetch(filtered, year, ++page);
  } else {
    filtered.length = 24;

    for (let i = 0; i < filtered.length; i++) {
      const { artist, title } = filtered[i];
      filtered[i].video = await getYoutubeData(artist, title);
    }

    const dataToSave = await handleImages(year, filtered);

    fs.writeFileSync(
      `./src/data/${year}.json`,
      JSON.stringify(dataToSave.reverse(), null, 4),
      'utf-8'
    );
  }
}

(async () => {
  for (let year = initialYear; year < new Date().getFullYear(); year++) {
    console.log(year);
    await fetch([], year);
  }
})();
