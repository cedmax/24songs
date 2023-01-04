/*eslint no-console: 0 */

require("colors");
const axios = require("axios");
const { initialYear } = require("./config.json");

let songs = [];
const failures = [];

for (let year = initialYear; year <= new Date().getFullYear(); year++) {
  try {
    songs = [...songs, ...require(`../src/data/${year}`)];
  } catch (e) {}
}

const validateVideos = async (song, songs) => {
  if (!song.video.includes("bandcamp")) {
    const songText = `${song.artist} – ${song.title}`;
    console.log("VALIDATING: ".bold + songText);
    try {
      const { data } = await axios.get(
        `https://api.unblockvideos.com/youtube_restrictions?id=${song.video.replace(
          "https://youtube.com/watch?v=",
          ""
        )}`
      );

      if (
        data[0] &&
        !data[0].blocked.filter(locale => ["IT", "GB"].includes(locale)).length
      ) {
        console.log(` GREAT: ${song.video}`.green);
      } else {
        throw new Error();
      }
    } catch (e) {
      failures.push(songText);
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
