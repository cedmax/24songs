import React, { memo, useState, useCallback, useEffect } from "react";
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

export default memo(({ data, year }) => {
  const [selected, setSelected] = useState(
    getPreselected(year, data, urlTokens)
  );
  const close = useCallback(() => setSelected({}), [setSelected]);

  useEffect(() => {
    const item = document.querySelector(".active");
    if (item && item.scrollIntoView) {
      setTimeout(() => {
        item.scrollIntoView({ block: "center" });
      }, 500);
    }
  }, []);

  return (
    <>
      {data.map((d, i) => (
        <Calendar
          selected={selected}
          key={year[i]}
          setSelected={setSelected}
          year={year[i]}
          data={d}
        />
      ))}
      <Modal close={close} isOpen={!!selected.video}>
        <Embed video={selected.video} />
      </Modal>
    </>
  );
});
