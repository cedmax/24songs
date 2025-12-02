/* eslint-disable no-unused-expressions */
import React, { memo, useState, useCallback, useEffect } from "react";
import axios from "axios";
import Embed from "./Embed";
import Lyrics from "./Lyrics";
import Modal from "./Modal";
import { props, isSupported } from "./CSSCustomProperties";

const alpha1 = `rgba(0,0,0,0)`;
const alpha2 = `rgba(255,255,255,0)`;
let alpha = alpha1;

const repaint = () => {
  alpha = alpha === alpha1 ? alpha2 : alpha1;
  document.documentElement.style.border = `1px solid ${alpha}`;
};

const date = new Date();
const urlTokens = window.location.pathname
  .split("/")
  .filter(token => !!token)
  .map(item => parseInt(item, 10));

const isWrongDate = tokens => !tokens[1] || tokens[1] !== 12;

const isDateNotEnabledYet = tokens =>
  tokens[0] === date.getFullYear() &&
  date.getMonth() === 11 &&
  tokens[2] > date.getDate();

const resetUrl = () => {
  window.location.replace("/");
  return null;
};

const getPreselected = (year, data, tokens) => {
  if (!tokens.length) return {};
  if (isWrongDate(tokens)) {
    return resetUrl();
  }

  if (isDateNotEnabledYet(tokens)) {
    return resetUrl();
  }

  const yearIndex = year.findIndex(item => item === tokens[0]);

  if (isNaN(yearIndex)) {
    return resetUrl();
  }

  window.location = `https://cedmax.net/music/24songs/${
    tokens[0]
  }/?day=${`${tokens[2]}`.padStart(2, 0)}`;

  //window.history.replaceState({}, "", "/");
  // return data[yearIndex][tokens[2] - 1];
};

const selectNext = (data, selected) => {
  const flattenData = data.reduce((a, b) => a.concat(b), []);
  const songIdx = flattenData.findIndex(({ id }) => id === selected.id);
  const nextSong = flattenData[songIdx + 1];

  return nextSong || {};
};

export default memo(({ data, year, children }) => {
  const [selected, setSelected] = useState(
    getPreselected(year, data, urlTokens)
  );
  const [lyrics, setLyrics] = useState({});
  const close = useCallback(() => {
    setSelected({});
    setLyrics("");
  }, [setSelected, setLyrics]);

  useEffect(() => {
    if (selected.id) {
      (async () => {
        try {
          const { data } = await axios.get(`/lyrics/${selected.id}.json`);
          setLyrics(data);
        } catch (e) {
          setLyrics({});
        }
      })();
    }
  }, [selected.id]);

  useEffect(() => {
    if (isSupported) {
      if (selected.palette) {
        selected.palette.forEach((colorCode, i) => {
          document.documentElement.style.setProperty(
            Object.keys(props)[i],
            `rgb(${colorCode.join(",")})`
          );
        });
      } else {
        Object.keys(props).forEach(propKey => {
          document.documentElement.style.setProperty(propKey, props[propKey]);
        });
      }
      repaint();
    }
  }, [selected.palette]);

  useEffect(() => {
    const item = document.querySelector(".active");
    if (item && item.scrollIntoView) {
      setTimeout(() => {
        item.scrollIntoView({ block: "center" });
      }, 500);
    }
  }, []);

  const playNext = useCallback(() => {
    const next = selectNext(data, selected);
    setSelected(next);
  }, [data, selected]);

  return (
    <>
      {children({ setSelected, selected })}
      <Modal close={close} isOpen={!!selected.video}>
        <Lyrics data={lyrics} />
        <Embed video={selected.video} playNext={playNext} />
      </Modal>
    </>
  );
});
