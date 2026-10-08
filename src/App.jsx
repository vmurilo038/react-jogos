import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Index";
import Home from "./pages/Home/Index";
import Favorites from "./pages/Favorites/Index";
import Details from "./pages/Details/Index";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/jogo/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}