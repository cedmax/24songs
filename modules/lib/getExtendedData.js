import getYoutubeData from "./getYoutubeData.js";

import getLyrics from "./getLyrics.js";
import handleImages from "./handleImages.js";
import { LiveArea } from "clui-live";

export default async function (filtered) {
  for (let i = 0; i < filtered.length; i++) {
    const item = filtered[i];
    item.title = item.track ?? item.title;

    console.log(`${i + 1}:    ${item.title} by ${item.artist}`);
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
      id,
      ...rest,
      video,
      palette,
    };
    videoArea.close();
    lyricsArea.close();
    imageArea.close();
  }
  return filtered;
}
