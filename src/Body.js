import React, { memo, useState, useCallback } from "react";
import Calendar from "./Calendar";
import Embed from "./Embed";
import Modal from "./Modal";

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

const getPreselected = (year, data, tokens) => {
  if (!tokens.length) return null;
  if (isWrongDate(tokens)) {
    window.location.replace("/");
    return null;
  }

  if (isDateNotEnabledYet(tokens)) {
    window.location.replace("/");
    return null;
  }

  const yearIndex = year.findIndex(item => item === tokens[0]);
  return data[yearIndex][tokens[2] - 1].video;
};

export default memo(({ data, year }) => {
  const [video, setVideo] = useState(getPreselected(year, data, urlTokens));
  const close = useCallback(() => setVideo(null), [setVideo]);
  return (
    <>
      {data.map((d, i) => (
        <Calendar key={year[i]} setVideo={setVideo} year={year[i]} data={d} />
      ))}
      <Modal close={close} isOpen={!!video}>
        <Embed video={video} />
      </Modal>
    </>
  );
});
