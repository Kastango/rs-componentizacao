import { useEffect, useState } from "react";

import { api } from '../services/api';

import { Button } from '../components/Button';
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ISideBar {
  onClickButton(id: number): void;
  selected: number;
}

export function SideBar({ onClickButton, selected }: ISideBar) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => onClickButton(genre.id)}
          selected={selected === genre.id}
        />
      ))}
    </div>
  </nav>
  )
}