const Footer = ({ deckPlayer1Length, deckPlayer2Length }) => {
  return (
    <footer className="bottom-0 left-0 z-20 p-4 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
      <span className="bodyText">
        Player 1 cards remaining: {deckPlayer1Length}
      </span>
      <span className="bodyText">
        Player 2 cards remaining: {deckPlayer2Length}
      </span>
    </footer>
  );
};

export default Footer;
