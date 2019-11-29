import React, { useCallback, memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Entry from "./CalendarEntry";
import "./Calendar.scss";
import playlists from "./data/playlists.json";

export default memo(({ year, data, setVideo }) => {
  const select = useCallback(
    e => {
      const video = e.currentTarget.getAttribute("data-url");
      setVideo(video);
    },
    [setVideo]
  );

  let filler = [];
  let spotify;
  if (data.length < 24) {
    filler = new Array(24 - data.length).fill(null);
  } else {
    spotify = playlists[year];
  }

  return (
    <div className="grid-container">
      <header className="title">
        <h1>
          <strong>24</strong> songs
          <small>{year}</small>
        </h1>
      </header>
      {data.map(item => (
        <Entry key={item.artist} item={item} select={select} />
      ))}
      {!!spotify && (
        <a href={spotify} target="_blank" rel="noopener noreferrer">
          <LazyLoadImage
            alt="Spotify playlist"
            src="/spotify.png"
            threshold={500}
          />
        </a>
      )}
      {filler.map((n, i) => (
        <div key={i} className="filler" />
      ))}
    </div>
  );
});
