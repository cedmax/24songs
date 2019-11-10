const fs = require('fs');
const download = require('image-downloader');
const slugify = require('slugify');

const slugConfig = { remove: /[*+~./?()'"!:@]/g };

module.exports = async (year, arr) => {
  const folder = `./src/data/${year}`;
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  await Promise.all(
    arr.map(item =>
      download({
        url: item.img.replace('/64s/', '/128s/'),
        dest: `${folder}/${slugify(item.artist, slugConfig)}-${slugify(
          item.title,
          slugConfig
        )}.jpg`,
      })
    )
  );

  return arr.map(item => ({
    ...item,
    img: `${slugify(item.artist, slugConfig)}-${slugify(
      item.title,
      slugConfig
    )}.jpg`,
  }));
};
