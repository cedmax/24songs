const download = require("image-downloader");
const slugify = require("slugify");
const getColors = require("./getColors");

const slugConfig = { remove: /[*+~./?()'"!:@]/g };

module.exports = async (item, logger) => {
  let id, palette;

  if (item.img || !item.palette) {
    const id = `${slugify(item.artist, slugConfig)}-${slugify(
      item.title,
      slugConfig
    )}`;

    const imgPath = `./public/images/${id}.jpg`;
    logger(`downloading image`);

    await new Promise(resolve =>
      download({
        url: item.img.replace("/64s/", "/128s/"),
        dest: imgPath,
        done: resolve,
      })
    );

    await new Promise(resolve => setTimeout(resolve, 1500));

    palette = await getColors(imgPath, logger);
  } else {
    id = item.id;
    palette = item.palette;
    logger(`palette already available`);
  }

  return {
    id,
    palette,
  };
};
