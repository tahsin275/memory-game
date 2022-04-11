import "./SingleCard.css";

function SingleCard({ card, disabled, flipped, handleChoice }) {
  function handleClick() {
    if (!disabled) {
      handleChoice(card);
    }
    console.log("clicking!");
  }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="card-front" />
        <img
          src="images/empty_stripe.jpg"
          alt="card stripe"
          className="card-back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
