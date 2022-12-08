import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Footer from './components/Footer';
import cards from './data.json';
import PlaceHolderCard from './components/PlaceHolderCard';
const PLAYER_1_WIN = 'Player 1 wins';
const PLAYER_2_WIN = 'Player 2 wins';
const DRAW = 'Draw';
const UNSTARTED = 'Who will win!?';
const CLOUDINARY_URL =
  'https://res.cloudinary.com/mitmuseum/image/upload/t_800/media-internal/';

const pickCard = (deck) => {
  return deck[0];
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const cloudinaryURL = (id) => {
  if (id) {
    return `${CLOUDINARY_URL}${id}.jpg`;
  } else {
    return null;
  }
};

const App = () => {
  const [playerTurn, setPlayerTurn] = useState(1);
  const [winner, setWinner] = useState();
  const [winnerString, setWinnerString] = useState(UNSTARTED);
  const [shuffledDeck] = useState(shuffle(cards));
  const [selectedProperty, setSelectedProperty] = useState();
  const [deckPlayer1] = useState(
    shuffledDeck.slice(0, Math.ceil(shuffledDeck.length / 2))
  );
  const [deckPlayer2] = useState(
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

  useEffect(() => {
    document.title = 'Top Trumps';
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
      setWinnerString(null);
    } else if (deckPlayer1.length === 0) {
      setGameOver(true);
      setGameOverText(
        `${PLAYER_2_WIN} with ${deckPlayer2.length} cards in their deck`
      );
      setWinnerString(null);
    } else if (deckPlayer2.length === 0) {
      setGameOver(true);
      setGameOverText(
        `${PLAYER_1_WIN} with ${deckPlayer1.length} cards in their deck`
      );
      setWinnerString(null);
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
      <h1 className="h1">Top Trumps</h1>
      {!!gameOver && <h2 className="h2">GAME OVER</h2>}
      {!!gameOverText && (
        <p className="bodyText font-semibold">{gameOverText}</p>
      )}
      {!gameOver && (
        <div className="flex justify-center">
          {playerTurn === 1 && (
            <div>
              <h2 className="h2">Player 1 😀 turn</h2>

              {!!firstCardPlayer1 && (
                <div className="flex justify-center">
                  <Card
                    title={firstCardPlayer1.title}
                    size={firstCardPlayer1.size}
                    numberOfColours={firstCardPlayer1.numberOfColours}
                    setSelectedProperty={setSelectedProperty}
                    selectedProperty={selectedProperty}
                    imageURL={cloudinaryURL(firstCardPlayer1.objectID)}
                    bodyText={firstCardPlayer1.description}
                  />
                </div>
              )}
            </div>
          )}
          <PlaceHolderCard />
          {playerTurn === 2 && (
            <div>
              <h2 className="h2">Player 2 🎃 turn</h2>
              {!!firstCardPlayer2 && (
                <div className="flex justify-center">
                  <Card
                    title={firstCardPlayer2.title}
                    size={firstCardPlayer2.size}
                    numberOfColours={firstCardPlayer2.numberOfColours}
                    setSelectedProperty={setSelectedProperty}
                    selectedProperty={selectedProperty}
                    imageURL={cloudinaryURL(firstCardPlayer2.objectID)}
                    bodyText={firstCardPlayer2.description}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {!!winnerString && (
        <div className="flex my-4 justify-center">
          <p className="bodyText">{winnerString}</p>
        </div>
      )}
      {!!selectedProperty && (
        <div className="flex m-4 justify-center">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => handleContinue()}
          >
            Continue
          </button>
        </div>
      )}
      <Footer
        deckPlayer1Length={deckPlayer1.length}
        deckPlayer2Length={deckPlayer2.length}
      />
    </div>
  );
};

export default App;
