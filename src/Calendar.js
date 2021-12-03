import React, { useCallback, memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Entry from "./CalendarEntry";
import "./Calendar.scss";
import playlists from "./data/playlists.json";

export default memo(({ year, data, selected, setSelected }) => {
  const select = useCallback(
    e => {
      const selectedId = e.currentTarget.getAttribute("data-id");
      const selected = data.find(item => item.id === selectedId);
      setSelected(selected);
    },
    [data, setSelected]
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
      {data.map((item, i) => (
        <Entry
          isActive={selected.id === item.id}
          key={item.artist}
          day={i + 1}
          item={item}
          select={select}
        />
      ))}
      {!!spotify && (
        <a href={spotify} target="_blank" rel="noopener noreferrer">
          <LazyLoadImage
            alt="Spotify playlist"
            src="/spotify.jpg"
            threshold={800}
            placeholderSrc="/preload.gif"
            wrapperClassName="lazyload"
          />
        </a>
      )}
      {filler.map((n, i) => (
        <div key={i} data-date={`${24 - (i + data.length)}`} />
      ))}
    </div>
  );
});
