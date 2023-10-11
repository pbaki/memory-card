import { useEffect, useState } from "react";
import "./memory-card.css";

const initialCardNumber = 4;

function MemoryCard() {
  const [cards, setCards] = useState([]);
  const [usedCards, setUsedCards] = useState([]);
  const [cardNumber, setcardNumber] = useState(initialCardNumber);
  const [gameMode, setGameMode] = useState(1);

  useEffect(() => {
    async function getGifs() {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=mMtQHgFTpMeJ16MX4IkYVtqrMhVChGNa&q=cats"
      );
      const responseData = await response.json();
      function getRandomGifs(numberOfGifs) {
        let newCards = [];
        let usedUrls = [];
        for (let i = 0; i < numberOfGifs; i++) {
          let random = Math.floor(Math.random() * responseData.data.length);
          let imgUrl = responseData.data[random].images.original.url;
          if (usedUrls.includes(imgUrl)) {
            console.log("it has it");
            i -= 1;
          } else {
            newCards.push({ imgUrl: imgUrl, key: newCards.length });
            usedUrls.push(imgUrl);
          }
        }
        return newCards;
      }
      let rendomizedGifsArray = getRandomGifs(cardNumber);
      setCards(rendomizedGifsArray);
    }
    getGifs();
    return () => {
      setCards([]);
    };
  }, [cardNumber]);

  useEffect(() => {
    let ifLost = false;
    //When game is lost, it resets
    if (usedCards.length > 1) {
      for (let item of usedCards) {
        if (usedCards.indexOf(item) !== usedCards.lastIndexOf(item)) {
          if (cardNumber !== initialCardNumber) {
            setcardNumber(initialCardNumber);
          }
          setUsedCards([]);
          setGameMode(1);
          ifLost = true;
        }
      }
    }
    //When game is won, it goes level further
    if (
      cards.length > 0 &&
      usedCards.length > 0 &&
      usedCards.length === cards.length &&
      ifLost == false
    ) {
      setcardNumber(cardNumber + 1);
      setUsedCards([]);
      setGameMode(gameMode + 1);
    }
  }, [usedCards]);

  //Resetting game on level 30
  if (cardNumber === 30) {
    setcardNumber(initialCardNumber);
    setUsedCards([]);
    setGameMode(0);
  }
  return (
    <div className="gameContainer">
      <div className="statsContainer">
        <Score score={usedCards.length} />
        <Level level={gameMode} />
      </div>
      <div className="cardsContainer">
        {cards.map((item) => {
          return (
            <div key={item.key}>
              <img
                src={item.imgUrl}
                alt="Random Gifs"
                key={item.key}
                id="card"
                onClick={() => {
                  setUsedCards([...usedCards, item]);
                }}
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Score({ score }) {
  return (
    <div className="score">
      <h2>Score : {score}</h2>
    </div>
  );
}
function Level({ level }) {
  return (
    <div className="level">
      <h2>Level : {level}</h2>
    </div>
  );
}

export default MemoryCard;
