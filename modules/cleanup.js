const fs = require("fs");
const { initialYear } = require("./config.json");

let yearsData = [];
for (let year = initialYear; year <= new Date().getFullYear(); year++) {
  try {
    yearsData = [...yearsData, ...require(`../src/data/${year}.json`)];
  } catch (e) {}
}

yearsData = yearsData.map(({ id }) => id);

const files = [
  ...new Set(
    fs
      .readdirSync("./public/images")
      .map(file => file.replace(".jpg", "").replace(".webp", ""))
  ),
];

files.forEach(file => {
  if (!yearsData.includes(file)) {
    try {
      fs.unlinkSync(`./public/images/${file}.jpg`);
      fs.unlinkSync(`./public/images/${file}.webp`);
      fs.unlinkSync(`./public/lyrics/${file}.json`);
    } catch (e) {}
  }
});
