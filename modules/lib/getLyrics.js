const genius = require("genius-lyrics");
const fs = require("fs");
const Genius = new genius.Client(process.env.GENIUS);
const chalk = require("chalk");

module.exports = async (item, logger) => {
  const filePath = `./public/lyrics/${item.id}.json`.toLowerCase();

  if (!fs.existsSync(filePath)) {
    logger(`searching for lyrics`);
    try {
      const searchResult = await Genius.songs.search(
        `${item.title} ${item.artist}`
      );

      const song = await Genius.songs.get(searchResult[0].id);
      const { fullTitle, url } = song;
      const lyrics = await song.lyrics();

      logger(chalk.bold(url));

      fs.writeFileSync(
        filePath,
        JSON.stringify({
          title: fullTitle,
          lyrics: lyrics.replace(/"/g, '\\"').replace(/\[.+\]\n/g, ""),
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
