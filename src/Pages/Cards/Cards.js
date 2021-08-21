import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";
import "./Cards.scss";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

//images
import cash from "../../assets/cardPNGS/cash-dollar-fill.png";
import card from "../../assets/cardPNGS/card-default-fill.png";
import amex from "../../assets/cardPNGS/amex-color.png";
import visa from "../../assets/cardPNGS/visa-color.png";
import mastercard from "../../assets/cardPNGS/mastercard-color.png";

const Cards = () => {
  const history = useHistory();
  const { userInfo, addCard } = useUserContext();
  const { first, last } = userInfo;
  const { formData, handleSubmit, handleRadioChange, handleInputChange } =
    useForm(
      {
        cardType: "",
        card4digits: "",
        bankName: "",
        accountType: "",
        creditCompany: "",
      },
      () => {
        const newCard = {
          id: Date.now(),
          ...formData,
        };
        addCard(newCard);
        history.push("/dashboard");
      }
    );

  return (
    <div className="cards">
      <div className="cards__container">
        <h2 className="cards__welcome">
          hello {first} {last}
        </h2>
        <h3 className="cards__instructions">
          enter a credit card or bank card you'd like to keep track of
        </h3>
        <form className="cards__form" onSubmit={handleSubmit}>
          <div className="cards__form-row">
            <div
              className={
                formData.cardType === "credit" ? "selected" : "cards__radio"
              }
            >
              <label className="cards__radio-label" htmlFor="credit">
                <img className="cards__png" src={card} alt="credit card png" />
                credit
              </label>
              <input
                className="cards__radio-input"
                type="radio"
                value="credit"
                name="cardType"
                id="credit"
                onChange={handleRadioChange}
              />
            </div>
            <div
              className={
                formData.cardType === "debit" ? "selected" : "cards__radio"
              }
            >
              <label className="cards__radio-label" htmlFor="debit">
                <img className="cards__png" src={cash} alt="cash png" />
                debit
              </label>
              <input
                className="cards__radio-input"
                type="radio"
                value="debit"
                name="cardType"
                id="debit"
                onChange={handleRadioChange}
              />
            </div>
          </div>

          {/* Credit Or Debit Information */}
          {formData.cardType === "credit" && (
            <div className="cards__company">
              <div
                className={
                  formData.creditCompany === "VISA"
                    ? "selected"
                    : "cards__radio"
                }
              >
                <label className="cards__radio-label" htmlFor="VISA">
                  <img className="cards__png" src={visa} alt="visa card png" />
                </label>
                <input
                  className="cards__radio-input"
                  type="radio"
                  value="VISA"
                  name="creditCompany"
                  id="VISA"
                  onChange={handleRadioChange}
                />
              </div>
              <div
                className={
                  formData.creditCompany === "MASTERCARD"
                    ? "selected"
                    : "cards__radio"
                }
              >
                <label className="cards__radio-label" htmlFor="MASTERCARD">
                  <img
                    className="cards__png"
                    src={mastercard}
                    alt="mastercard png"
                  />
                </label>
                <input
                  className="cards__radio-input"
                  type="radio"
                  value="MASTERCARD"
                  name="creditCompany"
                  id="MASTERCARD"
                  onChange={handleRadioChange}
                />
              </div>
              <div
                className={
                  formData.creditCompany === "AMEX"
                    ? "selected"
                    : "cards__radio"
                }
              >
                <label className="cards__radio-label" htmlFor="AMEX">
                  <img className="cards__png" src={amex} alt="cash png" />
                </label>
                <input
                  className="cards__radio-input"
                  type="radio"
                  value="AMEX"
                  name="creditCompany"
                  id="AMEX"
                  onChange={handleRadioChange}
                />
              </div>
            </div>
          )}
          {formData.cardType && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="cards__digits"
            >
              <div className="cards__title">card</div>
              <div className="cards__chip" />
              <div className="cards__numbers">
                <span className="cards__static">xxxx</span>
                <span className="cards__static">xxxx</span>
                <span className="cards__static">xxxx</span>
                <input
                  type="text"
                  pattern="^[0-9]*$"
                  maxLength="4"
                  className="cards__four"
                  onChange={handleInputChange}
                  name="card4digits"
                />
              </div>
              <div className="cards__bottom">
                <span className="cards__name">{first + " " + last}</span>
                {formData.creditCompany === "AMEX" &&
                  formData.cardType === "credit" && (
                    <img
                      className="cards__png-big"
                      src={amex}
                      alt="credit card company brand"
                    />
                  )}
                {formData.creditCompany === "VISA" &&
                  formData.cardType === "credit" && (
                    <img
                      className="cards__png-big"
                      src={visa}
                      alt="credit card company brand"
                    />
                  )}
                {formData.creditCompany === "MASTERCARD" &&
                  formData.cardType === "credit" && (
                    <img
                      className="cards__png-big"
                      src={mastercard}
                      alt="credit card company brand"
                    />
                  )}
              </div>
            </motion.div>
          )}
          <button className="cards__next">next</button>
        </form>
      </div>
    </div>
  );
};

export default Cards;
