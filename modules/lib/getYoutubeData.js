const axios = require("axios");
const chalk = require("chalk");

const getUrl = ({ artist, title }) =>
  `https://www.youtube.com/results?search_query=${encodeURI(
    `${title} by ${artist} `
  )}+official+video`;

module.exports = async (item, logger) => {
  if (item.video) {
    logger(chalk.bold("video already available"));
    return item.video;
  }
  logger("fetching video");
  const { data } = await axios.get(getUrl(item));
  const regex = /(\/watch\?v=[^\\"]+)/;
  const link = data.match(regex) && data.match(regex)[0];

  if (!link) {
    logger(chalk.bold("video not found"));
    return "";
  }
  const videoUrl = `https://youtube.com${link}`;
  logger(chalk.bold(videoUrl));
  return videoUrl;
};
