import React, { useState, useCallback } from "react";
import Footer from "./Footer";
import Body from "./Body";
import Calendar from "./Calendar";
import Ribbon from "./Ribbon";
import Chart from "./Chart";
import "./App.css";

const defaultView = "calendar";
const alternateView = "by artist";

function App({ data, year }) {
  const [view, setView] = useState(defaultView);
  const alternate = view === defaultView ? alternateView : defaultView;
  const toggleView = useCallback(() => {
    window.scrollTo(0, 0);
    setView(alternate);
  }, [alternate]);

  return (
    <>
      <Body data={data} year={year}>
        {({ setSelected, selected }) =>
          view === defaultView ? (
            data.map((d, i) => (
              <Calendar
                selected={selected}
                key={year[i]}
                setSelected={setSelected}
                year={year[i]}
                data={d}
              />
            ))
          ) : (
            <Chart
              selected={selected}
              setSelected={setSelected}
              data={data}
              year={year}
            />
          )
        }
      </Body>
      <Footer />
      <Ribbon view={alternate} toggleView={toggleView} />
    </>
  );
}

export default App;
