import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import cards from "./data.json";
const PLAYER_1_WIN = "Player 1 wins";
const PLAYER_2_WIN = "Player 2 wins";
const DRAW = "Draw";
const UNSTARTED = "Who will win!?";

const pickCard = (deck) => {
  return deck[0];
  // return deck[Math.floor(Math.random() * deck.length)];
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const App = () => {
  const [playerTurn, setPlayerTurn] = useState(1);
  const [winner, setWinner] = useState();
  const [winnerString, setWinnerString] = useState(UNSTARTED);
  const [shuffledDeck, setShuffledDeck] = useState(shuffle(cards));
  const [selectedProperty, setSelectedProperty] = useState();
  const [deckPlayer1, setDeckPlayer1] = useState(
    shuffledDeck.slice(0, Math.ceil(shuffledDeck.length / 2))
  );
  const [deckPlayer2, setDeckPlayer2] = useState(
    shuffledDeck.slice(-Math.ceil(shuffledDeck.length / 2))
  );
  const [firstCardPlayer1, setFirstCardPlayer1] = useState(
    pickCard(deckPlayer1)
  );
  const [firstCardPlayer2, setFirstCardPlayer2] = useState(
    pickCard(deckPlayer2)
  );
  const [gameOver, setGameOver] = useState(false);
  const [gameOverText, setGameOverText] = useState();

  const playerState = (player) => {
    if (playerTurn === 1 && player === 1) {
      return "active";
    } else if (playerTurn === 2 && player === 2) {
      return "active";
    } else {
      return "hidden";
    }
  };

  useEffect(() => {
    if (selectedProperty) {
      let opposingCard;
      if (playerTurn === 1) {
        opposingCard = firstCardPlayer2[selectedProperty.label];
        if (selectedProperty.value > opposingCard) {
          setWinner(1);
          setWinnerString(PLAYER_1_WIN);
        } else if (opposingCard > selectedProperty.value) {
          setWinner(2);
          setWinnerString(PLAYER_2_WIN);
        } else {
          setWinner(null);
          setWinnerString(DRAW);
        }
      } else {
        opposingCard = firstCardPlayer1[selectedProperty.label];
        if (selectedProperty.value > opposingCard) {
          setWinner(2);
          setWinnerString(PLAYER_2_WIN);
        } else if (opposingCard > selectedProperty.value) {
          setWinner(1);
          setWinnerString(PLAYER_1_WIN);
        } else {
          setWinner(null);
          setWinnerString(DRAW);
        }
      }
    }

    if (deckPlayer1.length === 0 && deckPlayer2.length === 0) {
      setGameOver(true);
      setGameOverText(DRAW);
    } else if (deckPlayer1.length === 0) {
      setGameOver(true);
      setGameOverText(
        `${PLAYER_2_WIN} with ${deckPlayer2.length} cards in their deck`
      );
    } else if (deckPlayer2.length === 0) {
      setGameOver(true);
      setGameOverText(
        `${PLAYER_1_WIN} with ${deckPlayer1.length} cards in their deck`
      );
    }
  }, [
    selectedProperty,
    firstCardPlayer1,
    firstCardPlayer2,
    playerTurn,
    deckPlayer1,
    deckPlayer2,
  ]);

  const handleContinue = () => {
    switch (winner) {
      case null:
        deckPlayer1.shift();
        deckPlayer2.shift();
        break;
      case 1:
        deckPlayer1.push(deckPlayer1.shift());
        deckPlayer1.push(deckPlayer2.shift());
        break;
      case 2:
        deckPlayer2.push(deckPlayer1.shift());
        deckPlayer2.push(deckPlayer2.shift());
        break;
      default:
        break;
    }
    console.log("DECK1");
    console.log(deckPlayer1);
    console.log("DECK2");
    console.log(deckPlayer2);
    nextTurn();
  };

  const nextTurn = () => {
    if (playerTurn === 1) {
      setPlayerTurn(2);
    } else {
      setPlayerTurn(1);
    }
    setSelectedProperty();
    setWinner(null);
    setWinnerString(UNSTARTED);
    setFirstCardPlayer1(pickCard(deckPlayer1));
    setFirstCardPlayer2(pickCard(deckPlayer2));
  };

  return (
    <div className="App">
      {!!gameOver && <p>GAME OVER</p>}
      {!!gameOverText && <p>{gameOverText}</p>}
      {!gameOver && (
        <div>
          {playerTurn === 1 && (
            <div>
              <h2>Player 1</h2>
              {!!firstCardPlayer1 && (
                <Card
                  title={firstCardPlayer1.title}
                  size={firstCardPlayer1.size}
                  numberOfColours={firstCardPlayer1.numberOfColours}
                  setSelectedProperty={setSelectedProperty}
                  selectedProperty={selectedProperty}
                  cardState={playerState(1)}
                />
              )}
            </div>
          )}
          {playerTurn === 2 && (
            <div>
              <h2>Player 2</h2>
              {!!firstCardPlayer2 && (
                <Card
                  title={firstCardPlayer2.title}
                  size={firstCardPlayer2.size}
                  numberOfColours={firstCardPlayer2.numberOfColours}
                  setSelectedProperty={setSelectedProperty}
                  selectedProperty={selectedProperty}
                  cardState={playerState(2)}
                />
              )}
            </div>
          )}
          {!!winnerString && <p>{winnerString}</p>}
          {!!selectedProperty && (
            <button type="button" onClick={() => handleContinue()}>
              Continue
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
