import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ParsedTitle = memo(({ title, artist }) => {
  const [song, featuring] = title.split("(feat.");
  return (
    <>
      {song}
      <br />
      <small>by</small> {artist}
      {featuring && (
        <small>
          <br />
          feat. {featuring.slice(0, -1)}
        </small>
      )}
    </>
  );
});

export default ({ item, select, isActive, day }) => (
  <button
    className={isActive ? "active" : ""}
    data-id={item.id}
    onClick={select}
  >
    <LazyLoadImage
      alt={item.artist + " " + item.title}
      src={`/images/${item.id}.webp`}
      threshold={800}
      placeholderSrc="/preload.gif"
      wrapperClassName="lazyload"
    />
    <span
      className="song-info"
      data-date={`${day ? 25 - day : `'` + `${item.year}`.slice(-2)}`}
    >
      <ParsedTitle title={item.title} artist={item.artist} />
    </span>
  </button>
);
