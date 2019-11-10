import React from 'react';
import './App.css';
import Calendar from './Calendar';

function App({ data, year }) {
  return (
    <div className="App">
      <div className="bk" />
      <Calendar year={year} data={data} />
    </div>
  );
}

export default App;
