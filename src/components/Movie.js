import React from 'react';

import classes from './Movie.module.css';
const Movie = (props) => {
  
const deleteMovie = (e) => {
  props.deleteMovie(e.target.id)

}

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={deleteMovie} id={props.id} style={{ backgroundColor: "red" }}>
        Delete Movie
      </button>
    </li>
  );
};

export default Movie;
