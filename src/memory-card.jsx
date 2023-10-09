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
      function getRandomGifs(numberOfGifs = 5) {
        let newCards = [];
        for (let i = 0; i < numberOfGifs; i++) {
          let random = Math.floor(
            Math.random() * (responseData.data.length - 0 + 1)
          );
          let imgUrl = responseData.data[random].images.original.url;
          newCards;
          if (newCards.includes(imgUrl)) {
            newCards.splice(newCards.indexOf(imgUrl), 1);
            i -= 1;
          }
          newCards.push({ imgUrl: imgUrl, key: newCards.length });
        }
        return newCards;
      }
      let rendomizedGifsArray = getRandomGifs();
      setCards(rendomizedGifsArray);
    }
    getGifs();
    return () => {
      setCards([]);
    };
  }, []);
  return (
    <div className="gameContainer">
      <div className="statsContainer"></div>
      <div className="cardsContainer">
        {cards.map((item) => {
          return (
            <>
              <img
                src={item.imgUrl}
                alt="Random Gifs"
                key={item.key}
                width={100}
                height={100}
              ></img>
            </>
          );
        })}
      </div>
    </div>
  );
}
function SingleCard({ img }) {
  return <div className="card">{/* image for game */}</div>;
}
function Score() {}
function Level() {}

export default MemoryCard;
