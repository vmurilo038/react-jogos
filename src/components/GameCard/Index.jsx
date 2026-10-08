import { useContext } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../../context/GameContext";

export default function GameCard({ game, onRemove }) {
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(GameContext);

  const favorite = isFavorite(game.id);

  function handleFavorite() {
    if (favorite) {
      if (onRemove) {
        onRemove();
      } else {
        removeFavorite(game.id);
      }
    } else {
      addFavorite(game);
    }
  }

  return (
    <div className="game-card">
      <img src={game.thumbnail} alt={game.title} />

      <div className="game-card-content">
        <h2>{game.title}</h2>
        <p>{game.genre}</p>
        <span>{game.platform}</span>

        <div className="game-actions">
          <Link to={`/jogo/${game.id}`}>
            Ver detalhes
          </Link>

          <button onClick={handleFavorite}>
            {favorite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
}