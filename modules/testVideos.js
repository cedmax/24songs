/*eslint no-console: 0 */

require("colors");
const axios = require("axios");

const initialYear = 2006;
let songs = [];
const failures = [];

for (let year = initialYear; year <= new Date().getFullYear(); year++) {
  try {
    songs = [...songs, ...require(`../src/data/${year}`)];
  } catch (e) {}
}

const validateVideos = async (song, songs) => {
  if (!song.video.includes("bandcamp")) {
    console.log("VALIDATING: ".bold + song.title);
    try {
      const { data } = await axios.get(
        `http://noembed.com/embed?url=${song.video}`
      );

      if (!data.error) {
        console.log(` GREAT: ${song.video}`.green);
      } else {
        throw new Error();
      }
    } catch (e) {
      failures.push(song.title);
      console.error(` FAILED: ${song.video}`.red);
    }
  }

  if (songs.length) {
    validateVideos(songs.shift(), songs);
  } else {
    if (failures.length) {
      console.error(` FAILED: ${failures.length} song(s) failed`.bold.red);

      failures.forEach(song => console.log(` ${song}`));
    } else {
      console.log(`\nALL GOOD!`.bold.green);
    }
  }
};

validateVideos(songs.shift(), songs);
