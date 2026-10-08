import { createContext, useState } from "react";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [notification, setNotification] = useState(null);

  function showNotification(message, type = "success", game = null) {
    setNotification(null);

    setTimeout(() => {
      setNotification({
        message,
        type,
        game,
      });
    }, 50);

    setTimeout(() => {
      setNotification((current) => {
        if (current?.message === message) {
          return null;
        }

        return current;
      });
    }, 5050);
  }

  function addFavorite(game) {
    const updatedFavorites = [...favorites, game];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    showNotification("Jogo adicionado aos favoritos");
  }

  function removeFavorite(id) {
    const game = favorites.find((item) => item.id === id);

    if (!game) {
      return;
    }

    const updatedFavorites = favorites.filter(
      (item) => item.id !== id
    );

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    showNotification(
      "Jogo removido dos favoritos",
      "remove",
      game
    );
  }

  function undoFavorite() {
    if (!notification?.game) {
      return;
    }

    const game = notification.game;

    const alreadyFavorite = favorites.some(
      (item) => item.id === game.id
    );

    if (!alreadyFavorite) {
      const updatedFavorites = [...favorites, game];

      setFavorites(updatedFavorites);
      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );
    }

    setNotification(null);
  }

  function isFavorite(id) {
    return favorites.some((game) => game.id === id);
  }

  return (
    <GameContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}

      {notification && (
        <div
          key={notification.message}
          className={`undo-toast ${
            notification.type === "remove"
              ? "notification-remove"
              : ""
          }`}
        >
          <span>{notification.message}</span>

          {notification.type === "remove" && (
            <button onClick={undoFavorite}>
              Desfazer
            </button>
          )}
        </div>
      )}
    </GameContext.Provider>
  );
}