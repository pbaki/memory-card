import { useEffect, useState } from "react";

function MemoryCard() {
  const [cards, setCards] = useState([]);
  const [gameMode, setGameMode] = useState(0);
  useEffect(() => {
    async function getGifs() {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=mMtQHgFTpMeJ16MX4IkYVtqrMhVChGNa&q=cheeseburgers"
      );
      const responseData = await response.json();
      console.log(responseData);
    }
    getGifs();
    return () => {};
  }, []);
  return (
    <div className="gameContainer">
      <div className="statsContainer"></div>
      <div className="cardsContainer"></div>
    </div>
  );
}
function SingleCard({ img }) {
  return <div className="card">{/* image for game */}</div>;
}
function Score() {}
function Level() {}

export default MemoryCard;
