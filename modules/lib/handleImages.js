const download = require("image-downloader");
const slugify = require("slugify");
const getColors = require("./getColors");
const chalk = require("chalk");
const sharp = require("sharp");
const webp = require("webp-converter");
const fs = require("fs");

const slugConfig = { remove: /[*+~./?()'"!:@]/g };

module.exports = async (item, logger) => {
  let id, palette;

  if (item.img || !item.palette) {
    id = `${slugify(item.artist, slugConfig)}-${slugify(
      item.title,
      slugConfig
    )}`;

    const imgPath = `./public/images/${id}.jpg`;
    logger(`downloading image`);

    if (item.img) {
      await download.image({
        url: item.img.replace("/64s/", "/128s/"),
        dest: imgPath,
      });
    }

    await sharp(imgPath).resize({ width: 500 }).toFile(`${imgPath}-temp`);
    fs.unlinkSync(imgPath);
    fs.renameSync(`${imgPath}-temp`, imgPath);
    await webp.cwebp(imgPath, imgPath.replace(".jpg", ".webp"), "-q 75");

    await new Promise(resolve => setTimeout(resolve, 1500));

    palette = await getColors(imgPath, logger);
  } else {
    id = item.id;
    palette = item.palette;
    logger(chalk.bold(`palette already available`));
  }

  return {
    id,
    palette,
  };
};
