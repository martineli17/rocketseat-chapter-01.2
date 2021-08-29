import { useEffect, useState } from "react";
import { api } from "../services/api";
import { GenreResponse } from "../types/GenreResponse";
import { MovieResponse } from "../types/MovieResponse";
import { MovieCard } from "./MovieCard";

interface ContentProps{
  genreId: number;
}

export function Content({ genreId }:ContentProps ) {
  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponse>({} as GenreResponse);

  useEffect(() => {
    api.get<MovieResponse[]>(`movies/?Genre_id=${genreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponse>(`genres/${genreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  },[genreId]);

 return (
   <>
     <div className="container">
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard 
                key ={movie.imdbID} 
                title={movie.Title} 
                poster={movie.Poster} 
                runtime={movie.Runtime} 
                rating={movie.Ratings[0].Value} 
              />
            ))}
          </div>
        </main>
      </div>
   </>
 )
}