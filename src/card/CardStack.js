import React from "react";
import Card from "react-credit-cards";

const CardStack = () => {
  return (
    <div>
      <div >
        <Card
          name="John Smith"
          number="3700 0000 0000 002"
          expiry="10/20"
          cvc="737"
        />
      </div>
      <div style={{ marginTop: '-50px', zIndex:'1'  }}>
        <Card
          name="John Smith"
          number="**** **** **** 7048"
          expiry="10/20"
          cvc="737"
          preview={true}
          issuer="visa"
        />
      </div>
    </div>
  );
};

export default CardStack;
