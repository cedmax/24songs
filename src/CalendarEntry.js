import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default ({ item, select, isActive, day }) => (
  <button
    className={isActive ? "active" : ""}
    data-id={item.id}
    onClick={select}
  >
    <LazyLoadImage
      alt={item.artist + " " + item.title}
      src={`/images/${item.id}.jpg`}
      threshold={800}
      placeholderSrc="/preload.gif"
      wrapperClassName="lazyload"
    />
    <span
      className="song-info"
      data-date={`${day ? `${day} Dec` : ""} ${item.year || ""}`}
    >
      {item.title} <br />
      <small>by</small> {item.artist}
    </span>
  </button>
);
