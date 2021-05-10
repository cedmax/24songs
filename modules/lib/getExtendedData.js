const getYoutubeData = require("./getYoutubeData");
const getLyrics = require("./getLyrics");
const handleImages = require("./handleImages");
const { LiveArea } = require("clui-live");

module.exports = async filtered => {
  for (let i = 0; i < filtered.length; i++) {
    const item = filtered[i];

    console.log(`    ${item.title} by ${item.artist}`);
    const videoArea = new LiveArea().hook();
    const lyricsArea = new LiveArea().hook();
    const imageArea = new LiveArea().hook();

    const [video, { id, palette }] = await Promise.all([
      getYoutubeData(item, log => {
        videoArea.write(`        video: ${log}`);
      }),
      handleImages(item, log => {
        imageArea.write(`        image: ${log}`);
      }),
      getLyrics(item, log => {
        lyricsArea.write(`        lyrics: ${log}`);
      }),
    ]);
    const { img, ...rest } = item;
    filtered[i] = {
      ...rest,
      video,
      id,
      palette,
    };
    videoArea.close();
    lyricsArea.close();
    imageArea.close();
  }
  return filtered;
};
