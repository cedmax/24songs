require("dotenv").config();
const genius = require("genius-lyrics");
const fs = require("fs");
const Genius = new genius.Client(process.env.GENIUS);
const chalk = require("chalk");

module.exports = async (item, logger) => {
  const filePath = `./public/lyrics/${item.id}.json`.toLowerCase();

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

      logger(chalk.bold(url));

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
      logger(chalk.bold(`lyrics not found`));
    }
  } else {
    logger(chalk.bold(`lyrics already available`));
  }
};
