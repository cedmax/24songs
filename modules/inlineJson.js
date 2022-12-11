const fs = require("fs");

const list = fs.readdirSync(`${__dirname}/../public/lyrics`);

list.forEach(file => {
  if (file.endsWith(".json")) {
    const json = require(`${__dirname}/../public/lyrics/${file}`);

    fs.writeFileSync(
      `${__dirname}/../public/lyrics/${file}`,
      JSON.stringify(json),
      "utf8"
    );
  }
});
