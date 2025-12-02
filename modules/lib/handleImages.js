const download = require("image-downloader");
const getColors = require("./getColors");
const chalk = require("chalk");
const sharp = require("sharp");
const webp = require("webp-converter");
const fs = require("fs");

module.exports = async (item, logger) => {
  let id, palette;
  const imgPath = `${__dirname}/../../public/images/${item.id}.jpg`;

  if (item.image || !item.palette) {
    logger(`downloading image`);
    if (!fs.existsSync(imgPath)) {
      if (item.image) {
        try {
          await download.image({
            url: item.image.replace("/64s/", "/128s/"),
            dest: imgPath,
          });
          logger(`image downloaded`);
        } catch (e) {
          logger(
            chalk.red(`missing image: ${item.image.replace("/64s/", "/128s/")}`)
          );
        }
      }
    }

    if (fs.existsSync(imgPath)) {
      if (!fs.existsSync(imgPath.replace(".jpg", ".webp"))) {
        await sharp(imgPath).resize({ width: 500 }).toFile(`${imgPath}-temp`);
        fs.unlinkSync(imgPath);
        fs.renameSync(`${imgPath}-temp`, imgPath);
        await webp.cwebp(imgPath, imgPath.replace(".jpg", ".webp"), "-q 75");
      }
      await new Promise(resolve => setTimeout(resolve, 1500));

      palette = await getColors(imgPath, logger);
    }
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
