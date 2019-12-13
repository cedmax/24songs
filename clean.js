// needed to run once
const fs = require("fs");
const initialYear = 2006;

const fix = year => {
  const filePath = `./src/data/${year}.json`;
  const data = require(filePath);
  const fixed = data.map(item => {
    const id = item.img.replace(".jpg", "");
    delete item.img;
    return {
      id,
      ...item
    };
  });
  fs.writeFileSync(filePath, JSON.stringify(fixed, null, 4), "utf-8");
};

(async () => {
  for (let year = initialYear; year <= new Date().getFullYear(); year++) {
    fix(year);
  }
})();
