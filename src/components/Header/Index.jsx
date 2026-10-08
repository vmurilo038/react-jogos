import { Link } from "react-router-dom";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

export default function Header() {
  const { favorites } = useContext(GameContext);

  return (
    <header className="header">
      <Link to="/" className="logo">
        🎮 Game Library
      </Link>

      <nav>
        <Link to="/">Jogos</Link>

        <Link to="/favoritos">
          Favoritos ({favorites.length})
        </Link>
      </nav>
    </header>
  );
}