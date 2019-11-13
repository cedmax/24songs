import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default ({ item, select }) => (
  <button data-url={item.video} onClick={select}>
    <LazyLoadImage
      alt={item.artist + " " + item.title}
      src={`/images/${item.img}`}
      threshold={500}
    />
    <span className="song-info">
      {item.title} <br />
      <small>by</small> {item.artist}
    </span>
  </button>
);
