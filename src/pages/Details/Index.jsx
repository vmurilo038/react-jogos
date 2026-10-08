import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GameContext } from "../../context/GameContext";
import { getGameDetails } from "../../services/api";

export default function Details() {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addFavorite, removeFavorite, isFavorite } =
    useContext(GameContext);

  useEffect(() => {
    async function loadGame() {
      try {
        setLoading(true);
        setError("");

        const data = await getGameDetails(id);

        setGame(data);
      } catch (error) {
        console.error(error);
        setError("Não foi possível carregar os detalhes do jogo.");
      } finally {
        setLoading(false);
      }
    }

    loadGame();
  }, [id]);

  if (loading) {
    return <p className="status">Carregando detalhes...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  if (!game) {
    return <p className="status">Jogo não encontrado.</p>;
  }

  const favorite = isFavorite(game.id);

  function handleFavorite() {
    if (favorite) {
      removeFavorite(game.id);
    } else {
      addFavorite(game);
    }
  }

  return (
    <main className="details">
      <Link to="/" className="back">
        ← Voltar
      </Link>

      <img
        className="details-image"
        src={game.thumbnail}
        alt={game.title}
      />

      <div className="details-content">
        <h1>{game.title}</h1>

        <p>{game.description}</p>

        <div className="details-info">
          <span>🎮 {game.genre}</span>
          <span>💻 {game.platform}</span>
          <span>🏢 {game.publisher}</span>
          <span>📅 {game.release_date}</span>
        </div>

        <button
          className="favorite-button"
          onClick={handleFavorite}
        >
          {favorite
            ? "★ Remover dos favoritos"
            : "☆ Adicionar aos favoritos"}
        </button>

        {game.screenshots && game.screenshots.length > 0 && (
          <section className="screenshots">
            <h2>Imagens</h2>

            <div className="screenshot-grid">
              {game.screenshots.map((screenshot) => (
                <img
                  key={screenshot.id}
                  src={screenshot.image}
                  alt={game.title}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}