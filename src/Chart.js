import React, { useState, useCallback } from "react";
import Entry from "./CalendarEntry";

export default ({ data, year, selected, setSelected }) => {
  const [chartData] = useState(() => {
    return Object.entries(
      data
        .reduce(
          (a, b, i) =>
            a.concat(
              b.map(item => ({
                ...item,
                year: year[i],
              }))
            ),
          []
        )
        .reduce((acc, song) => {
          if (!acc[song.artist]) {
            acc[song.artist] = [song];
          } else {
            acc[song.artist].push(song);
          }
          acc[song.artist].sort((a, b) => a.year - b.year);
          return acc;
        }, {})
    )
      .filter(entry => entry[1].length > 1)
      .sort((entryA, entryB) => entryB[1].length - entryA[1].length);
  });

  const select = useCallback(
    e => {
      const selectedId = e.currentTarget.getAttribute("data-id");
      const selected = chartData
        .map(item => {
          return item[1].find(i => i.id === selectedId);
        })
        .filter(item => !!item)[0];

      setSelected(selected);
    },
    [chartData, setSelected]
  );

  return chartData.map(([artist, items]) => {
    const content = items.map(item => (
      <Entry
        select={select}
        isActive={selected.id === item.id}
        key={item.title + item.year}
        item={item}
      />
    ));

    return (
      <div key={artist} className="grid-container-extra">
        <h1>{artist}</h1>
        {content}
      </div>
    );
  });
};
