import useHttp from "hooks/use-http";
import React, { useEffect, useState } from "react";
import Card from "react-credit-cards";

// HOC adds margin and z-index to the card and returns new component
const HOC = (Component, marginTop = null, zIndex = null) => {
  return (props) => {
    return (
      <div style={{ marginTop: `-${marginTop}px`, zIndex: `${zIndex}` }}>
        <Component {...props} />
      </div>
    );
  };
};

const CardComponent = (props) => {
  return <Card {...props} />;
};

const CardStack = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.tokens.access.token;

  const [cards, setCards] = useState([]);

  const { error, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest(
      {
        url: "https://interview-api.onrender.com/v1/cards",
        headers: { Authorization: `Bearer ${token}` },
      },
      (data) => setCards(data.results)
    );
  }, []);
  if (error) console.log(error);
  console.log(cards)

  const renderedCards = cards.map((card, index) => {
    const CreditCard = HOC(CardComponent, (index + 1) * 10, index);
    return (
      <CreditCard
        key={card.id}
        name={card.name}
        number={card.cardNumber}
        expiry={card.cardExpiration}
        cvc='123'
        issuer={card.category}
      />
    );
  });

  return (
    <div>
      {renderedCards}
    </div>
  );
};

export default CardStack;
