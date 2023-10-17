import { useEffect, useState } from "react";
import "./memory-card.css";

const initialCardNumber = 4;

function MemoryCard() {
  const [cards, setCards] = useState([]);
  const [usedCards, setUsedCards] = useState([]);
  const [cardNumber, setcardNumber] = useState(initialCardNumber);
  const [gameMode, setGameMode] = useState(1);
  const [apiData, setAPIData] = useState(null);

  useEffect(() => {
    async function getGifs() {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/search?api_key=mMtQHgFTpMeJ16MX4IkYVtqrMhVChGNa&q=cats"
      );
      const responseData = await response.json();
      setAPIData(responseData);
    }
    getGifs();
  }, []);

  useEffect(() => {
    function getRandomGifs(numberOfGifs) {
      let newCards = [];
      let usedUrls = [];
      for (let i = 0; i < numberOfGifs; i++) {
        let random = Math.floor(Math.random() * apiData.data.length);
        let imgUrl = apiData.data[random].images.original.url;
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
    if (apiData !== null) {
      let rendomizedGifsArray = getRandomGifs(cardNumber);
      setCards(rendomizedGifsArray);
    }
  }, [apiData, cardNumber]);

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

  function shuffleArray(arrayToShuffle) {
    const array = [...arrayToShuffle];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
                  setCards(shuffleArray(cards));
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
