import React from 'react';
import './App.css';
import Calendar from './Calendar';

const songs = new Array(12);

songs.fill([
  {
    src: 'https://www.youtube.com/watch?v=r_psWif7vno',
    name: 'Dark Bells',
    artist: 'Caracara',
  },
]);

function App() {
  return (
    <div className="App">
      <div className="bk" />
      <Calendar />
    </div>
  );
}

export default App;
