const axios = require("axios");

const getUrl = (artist, title) =>
  `https://www.youtube.com/results?search_query=${encodeURI(
    `${title} by ${artist} `
  )}+official+video`;

module.exports = async (artist, title) => {
  const { data } = await axios.get(getUrl(artist, title));
  const regex = /(\/watch\?v=[^\\"]+)/;
  const link = data.match(regex) && data.match(regex)[0];

  if (!link) {
    console.log("video not found for", artist, title);
    return "";
  }

  return `https://youtube.com${link}`;
};
