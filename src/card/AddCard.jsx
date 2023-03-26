import React, { useState, useRef } from "react";
import Card from "react-credit-cards";
import SupportedCards from "./SupportedCards";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";
import "react-credit-cards/es/styles-compiled.css";
import useHttp from "hooks/use-http";

import cardType from "_helpers/card-type";

const AddCard = () => {
  const { error, sendRequest } = useHttp();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.tokens.access.token;

  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });

  const { name, number, expiry, cvc, focused, issuer, formData } = state;

  const formRef = useRef(null);

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setState({ ...state, issuer });
    }
  };

  const handleInputFocus = ({ target }) => {
    setState({ ...state, focused: target.name });
  };

  const handleInputChange = ({ target }) => {
    let value = target.value;

    if (target.name === "number") {
      value = formatCreditCardNumber(value);
    } else if (target.name === "expiry") {
      value = formatExpirationDate(value);
    } else if (target.name === "cvc") {
      value = formatCVC(value);
    }

    setState({ ...state, [target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});
    const cardData = {
      name: formData.name,
      cardExpiration: formData.expiry,
      cardHolder: formData.name,
      cardNumber: formData.number,
      category: cardType(formData.issuer),
    };
    sendRequest(
      {
        url: "https://interview-api.onrender.com/v1/cards",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/JSON",
        },
        body: cardData,
      },
      (data) => {
        console.log(data);
      }
    );
    if(error) console.log(error);

    setState({ ...state, formData });
    formRef.current.reset();
  };

  return (
    <div key="Payment">
      <div className="App-payment">
        <h1>React Credit Cards</h1>
        <h4>Beautiful credit cards for your payment forms</h4>
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={handleCallback}
        />
        <br />
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <small>E.g.: 49..., 51..., 36..., 37...</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="col-6">
              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
          <input type="hidden" name="issuer" value={issuer} />
          <br />
          <div className="form-actions">
            <button className="btn btn-primary btn-block">PAY</button>
          </div>
        </form>
        {formData && (
          <div className="App-highlight">
            {formatFormData(formData).map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>
        )}
        <hr style={{ margin: "30px 0" }} />
        <SupportedCards />
      </div>
    </div>
  );
};

export default AddCard;
