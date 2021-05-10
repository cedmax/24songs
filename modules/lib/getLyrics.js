require("dotenv").config();
const genius = require("genius-lyrics");
const slugify = require("slugify");
const fs = require("fs");
const Genius = new genius.Client(process.env.GENIUS);
const slugConfig = { remove: /[*+~./?()'"!:@]/g };

module.exports = async (item, logger) => {
  const filePath = `./public/lyrics/${slugify(
    item.artist,
    slugConfig
  )}-${slugify(item.title, slugConfig)}.json`;

  if (!fs.existsSync(filePath)) {
    logger(`searching for lyrics`);
    try {
      const searchResult = await Genius.tracks.search(
        `${item.title} ${item.artist}`
      );

      const song = await Genius.tracks.get(searchResult[0].id);
      const {
        titles: { full: full_title },
        url,
      } = song;
      const lyrics = await song.lyrics();

      logger(url);

      fs.writeFileSync(
        filePath,
        JSON.stringify({
          title: full_title,
          lyrics: lyrics.replace(/"/g, '\\"'),
          url,
        })
      );
    } catch (e) {
      fs.writeFileSync(filePath, JSON.stringify({ reason: "MISSING" }));
      logger(`lyrics not found`);
    }
  } else {
    logger(`lyrics already available`);
  }
};
