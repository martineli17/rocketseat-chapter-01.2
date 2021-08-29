import { useEffect, useState } from "react";
import { api } from '../services/api';
import { Button } from "./Button";
import {GenreResponse} from '../types/GenreResponse';

interface SideBarProps{
  onChangeGenre(genreId: number):void;
}

export function SideBar({ onChangeGenre }:SideBarProps) {
  const [genres, setGenres] = useState<GenreResponse[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponse[]>('genres').then(response => {
      setGenres(response.data);
      onChangeGenre(selectedGenreId);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    onChangeGenre(id);
  }
  
  return (
    <>
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
    </>
  )
}