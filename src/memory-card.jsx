import { useEffect, useState } from "react";

function MemoryCard() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    // Api call then select few random images/gifs as cards
  });
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
