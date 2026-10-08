const API_URL = "https://www.freetogame.com/api";

export async function getGames(genre = "") {
  let url = `${API_URL}/games`;

  if (genre) {
    url = `${API_URL}/games?category=${genre}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar jogos");
  }

  return response.json();
}

export async function getGameDetails(id) {
  const response = await fetch(`${API_URL}/game?id=${id}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do jogo");
  }

  return response.json();
}