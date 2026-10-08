import { useEffect, useState } from "react";
import GameCard from "../../components/GameCard/Index";
import { getGames } from "../../services/api";

export default function Home() {
const [games, setGames] = useState([]);
const [search, setSearch] = useState("");
const [genre, setGenre] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
async function loadGames() {
try {
setLoading(true);
setError("");

    const data = await getGames(genre);

    setGames(data);
  } catch (error) {
    console.error(error);
    setError("Não foi possível carregar os jogos.");
  } finally {
    setLoading(false);
  }
}

loadGames();

}, [genre]);

const filteredGames = games.filter((game) =>
game.title.toLowerCase().includes(search.toLowerCase())
);

return (
<main>
<section className="hero">
<h1>Biblioteca de Jogos</h1>
<p>Encontre seus jogos favoritos.</p>

    <div className="filters">
      <input
        type="text"
        placeholder="Pesquisar jogo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="">Todos os gêneros</option>
        <option value="mmorpg">MMORPG</option>
        <option value="shooter">Shooter</option>
        <option value="strategy">Strategy</option>
        <option value="moba">MOBA</option>
        <option value="racing">Racing</option>
        <option value="sports">Sports</option>
        <option value="survival">Survival</option>
        <option value="battle-royale">Battle Royale</option>
        <option value="fighting">Fighting</option>
        <option value="card">Card</option>
        <option value="anime">Anime</option>
      </select>
    </div>
  </section>

  {loading && <p className="status">Carregando jogos...</p>}

  {error && <p className="status error">{error}</p>}

  {!loading && !error && filteredGames.length === 0 && (
    <p className="status">Nenhum jogo encontrado.</p>
  )}

  {!loading && !error && filteredGames.length > 0 && (
    <section className="game-grid">
      {filteredGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  )}
</main>

);
}