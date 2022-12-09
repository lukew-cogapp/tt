const Card = ({
  name,
  cost,
  dateMade,
  lengthOverall,
  displacement,
  hullNumber,
  beam,
  setSelectedProperty,
  imageURL,
  bodyText,
}) => {
  const handleButton = (label, value) => {
    // setSelectedProperty(value);
    setSelectedProperty({ label, value });
  };

  return (
    <div
      className={`block max-w-sm pb-4 bg-white border border-gray-200 rounded-lg shadow-md`}
    >
      {!!imageURL && <img className="w-full" src={imageURL} alt=""></img>}
      {!imageURL && (
        <img
          className="w-full"
          src="https://picsum.photos/300/300"
          alt=""
        ></img>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="bodyText">{dateMade}</p>
        <p className="bodyText">{bodyText}</p>
      </div>
      <div className="flex-col mx-4">
        <div className="flex md:justify-between">
          <p class="bodyText large">Cost</p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => handleButton('cost', cost)}
          >
            ${cost}
          </button>
        </div>
        <div className="flex md:justify-between">
          <p class="bodyText large">Length</p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => handleButton('lengthOverall', lengthOverall)}
          >
            {lengthOverall} feet
          </button>
        </div>
        <div className="flex md:justify-between">
          <p class="bodyText large">Displacement</p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => handleButton('displacement', displacement)}
          >
            {displacement} tons
          </button>
        </div>
        <div className="flex md:justify-between">
          <p class="bodyText large">Beam</p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => handleButton('beam', beam)}
          >
            {beam} feet
          </button>
        </div>
        <div className="flex md:justify-between">
          <p class="bodyText large">Hull number</p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => handleButton('hullNumber', hullNumber)}
          >
            {hullNumber}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
