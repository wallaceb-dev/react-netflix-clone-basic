import React from 'react';
import Tmdb from '../Tmdb';
import './MoviesRuler.css';

export default ({ title, items }) => {
  return (
    <div className='moviesRuler'>
      <h2>{title}</h2>
      <div className="moviesRuler--listingarea">
        <div className="moviesRuler--listing">
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div className="moviesRuler--item" key={key}>
                <img
                  key={key}
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.original_title}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
