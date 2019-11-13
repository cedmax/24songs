const fs = require("fs");
const now = new Date();
const year = now.getMonth() === 11 ? now.getFullYear() : now.getFullYear() - 1;

const data = require(`../src/data/${year}.json`);

fs.writeFileSync("./functions/rss/data.json", JSON.stringify(data), "utf-8");
