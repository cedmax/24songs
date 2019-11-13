const sizeOf = require("image-size");
const fs = require("fs");

const images = fs
  .readdirSync("./public/images")
  .filter(item => item.endsWith(".jpg"));

images.forEach(img => {
  const { width, height } = sizeOf(`./public/images/${img}`);
  if (width !== height) {
    console.log(`./public/images/${img}`);
  }
});
