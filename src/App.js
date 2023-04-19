import React, { useEffect, useCallback, useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import LoadingSpinner from "./components/Loading/LoadingSpinner";
import Form from "./components/Form/Form";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fethMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-2e1dc-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("somthing went wrong ...Retrying");
      }
      const data = await response.json();
      // console.log(data)
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].opening_crawl,
          releaseDate: data[key].release_date,
          
        })
      }

     
      setMovies(loadedMovies);
    } catch (err) {
      // console.log(err.message)
      // clearInterval(intervalID);
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fethMoviesHandler();
  }, [fethMoviesHandler]);


  const addMoviesHandler = async(movie) => {
    // console.log(data);
   const response =  await fetch(
      "https://react-http-2e1dc-default-rtdb.firebaseio.com/movies.json", {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type' : 'application/json'
        }
    });
    
    const data = await response.json();
    // console.log(data);
    fethMoviesHandler();
  }

  const deleteMoviesHandler = async (Id) => {
    console.log('working',Id)
      
    const response = await fetch(
      `https://react-http-2e1dc-default-rtdb.firebaseio.com/movies/${Id}.json/`, {
        method: 'DELETE',
       
        headers: {
          'Content-Type' : 'application/josn'
        }
      }
    );
    fethMoviesHandler();
  }

  return (
    <React.Fragment>
      <Form onAddMovies={addMoviesHandler} />
      <section>
        <button onClick={fethMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && !error && <MoviesList deleteMovie={deleteMoviesHandler} movies={movies} />}
        {movies.length === 0 && !error && <p>NO Movies Found</p>}
        {isLoading && <LoadingSpinner />}

        {/* {isLoading && <p>Loading....</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
