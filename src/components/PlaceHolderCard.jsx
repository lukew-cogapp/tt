import cardBack from '../assets/cardback.png';

const PlaceHolderCard = () => {
  return (
    <div className="block max-w-sm">
      <img src={cardBack} alt="back of a playing card" />
    </div>
  );
};

export default PlaceHolderCard;
