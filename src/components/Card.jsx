
const Card = ({ title, size, numberOfColours, setSelectedProperty, selectedProperty, cardState }) => {

  const handleButton = (label, value) => {
    // setSelectedProperty(value);
    setSelectedProperty({ label, value });
  };

  return (
    <div className={`card ${cardState}`}>
      <p>Title: {title}</p>
      <button type="button" onClick={() => handleButton("size", size)}>
        Size: {size}
      </button>
      <button
        type="button"
        onClick={() => handleButton("numberOfColours", numberOfColours)}
      >
        Number of colours: {numberOfColours}
      </button>
      {/* {!!selectedProperty && <p>
        Selected property: {selectedProperty.label} {selectedProperty.value}
      </p>} */}
    </div>
  );
};

export default Card;