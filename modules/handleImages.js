const fs = require('fs');
const download = require('image-downloader');
const slugify = require('slugify');

module.exports = async (year, arr) => {
  const folder = `./data/${year}`;
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  await Promise.all(
    arr.map(item =>
      download({
        url: item.img.replace('/64s/', '/128s/'),
        dest: `${folder}/${slugify(item.artist)}-${slugify(item.title)}.jpg`,
      })
    )
  );

  return arr.map(item => ({
    ...item,
    img: `${slugify(item.artist)}-${slugify(item.title)}.jpg`,
  }));
};
