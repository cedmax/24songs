/* eslint-disable no-unused-expressions */
import React, { memo, useState, useCallback, useEffect } from "react";
import axios from "axios";
import Embed from "./Embed";
import Lyrics from "./Lyrics";
import Modal from "./Modal";
import { props } from "./CSSCustomProperties";

const repaint = () => {
  const scroll =
    window.pageYOffset ||
    (document.documentElement || document.body.parentNode || document.body)
      .scrollTop;
  document.body.style.display = "none";
  document.body.offsetHeight;
  document.body.style.display = "block";
  window.scrollTo(0, scroll);
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
  window.history.replaceState({}, "", "/");
  return data[yearIndex][tokens[2] - 1];
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
    if (next) {
      setSelected(next);
    }
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
