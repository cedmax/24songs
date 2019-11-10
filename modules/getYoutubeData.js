const axios = require('axios');
const cheerio = require('cheerio');

const getUrl = (artist, title) =>
  `https://www.youtube.com/results?search_query=${encodeURI(
    `${artist} ${title}`
  )}+official+video+-cover+-live`;

module.exports = async (artist, title) => {
  const { data } = await axios.get(getUrl(artist, title));
  const $ = cheerio.load(data);
  const link = $('.yt-pl-thumb-link').attr('href');

  if (!link) {
    console.log('video not found for', artist, title);
    return '';
  }

  return `https://youtube.com${link}`;
};
