import { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
export default function AnimeList() {
  const [animieData, setAnimieData] = useState([]);
  useEffect(() => {
    // Fetch data from your backend API
    fetch("http://localhost:8000/animelist.php")
      .then((response) => response.json())
      .then((data) => {
        setAnimieData(data);
      })
      .catch((error) => console.error("Error fetching anime data:", error));
  }, []);
  return (
    <div className="bg-zinc-700">
      
      <AnimeCard animes={animieData} />
    </div>
  );
}
