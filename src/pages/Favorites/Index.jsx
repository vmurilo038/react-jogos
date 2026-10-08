import { useContext, useState } from "react";
import GameCard from "../../components/GameCard/Index";
import { GameContext } from "../../context/GameContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useContext(GameContext);
  const [removingId, setRemovingId] = useState(null);

  function handleRemove(id) {
    setRemovingId(id);

    setTimeout(() => {
      removeFavorite(id);
      setRemovingId(null);
    }, 500);
  }

  return (
    <main>
      <section className="hero">
        <h1>Meus Favoritos</h1>
        <p>Seus jogos favoritos ficam aqui.</p>
      </section>

      {favorites.length === 0 ? (
        <p className="status">
          Você ainda não adicionou nenhum jogo aos favoritos.
        </p>
      ) : (
        <section className="game-grid">
          {favorites.map((game) => (
            <div
              key={game.id}
              className={
                removingId === game.id
                  ? "favorite-removing"
                  : ""
              }
            >
              <GameCard
                game={game}
                onRemove={() => handleRemove(game.id)}
              />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}