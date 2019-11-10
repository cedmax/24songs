import React from 'react';
import './Calendar.scss';
export default ({ year, data }) => (
  <div className="grid-container">
    <header className="title">
      <h1>
        <span>24</span> songs
      </h1>
    </header>
    {data.map(item => (
      <div>
        <img
          alt={item.artist + ' ' + item.title}
          src={require(`./data/${year}/${item.img}`)}
        />
      </div>
    ))}
  </div>
);
