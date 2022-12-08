const Card = ({
  title,
  size,
  numberOfColours,
  setSelectedProperty,
  selectedProperty,
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
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="bodyText">{bodyText}</p>
      </div>
      <div className="inline-flex">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => handleButton('size', size)}
        >
          Size: {size}
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => handleButton('numberOfColours', numberOfColours)}
        >
          Number of colours: {numberOfColours}
        </button>
      </div>
      {/* {!!selectedProperty && <p>
        Selected property: {selectedProperty.label} {selectedProperty.value}
      </p>} */}
    </div>
  );
};

export default Card;
