const download = require("image-downloader");
const slugify = require("slugify");

const slugConfig = { remove: /[*+~./?()'"!:@]/g };

module.exports = async arr => {
  await Promise.all(
    arr.map(item =>
      download({
        url: item.img.replace("/64s/", "/128s/"),
        dest: `./public/images/${slugify(item.artist, slugConfig)}-${slugify(
          item.title,
          slugConfig
        )}.jpg`,
      })
    )
  );

  return arr.map(item => {
    const { img, ...rest } = item;

    return {
      id: `${slugify(item.artist, slugConfig)}-${slugify(
        item.title,
        slugConfig
      )}`,
      ...rest,
    };
  });
};
