const year = process.argv.slice(2)[0];

if (!year) {
  console.log("you forgot to specify the year");
  process.exit();
}

const yearData = require(`../src/data/${year}.json`);

yearData.forEach(({ title, artist }) => {
  console.log(`${artist} - ${title}`);
});

console.log("");
console.log(
  "now go to:",
  "https://www.tunemymusic.com/Text-File-to-Spotify.php"
);
