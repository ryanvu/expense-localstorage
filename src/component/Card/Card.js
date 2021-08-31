import React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import "../../Pages/Cards/Cards.scss";

//images
import amex from "../../assets/cardPNGS/amex-color.png";
import visa from "../../assets/cardPNGS/visa-color.png";
import mastercard from "../../assets/cardPNGS/mastercard-color.png";

const cardVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const Card = ({ digits, name, type }) => {
  const history = useHistory();
  return (
    <motion.div
      onClick={() => {
        history.push(`/card/${digits}`);
      }}
      variants={cardVariant}
      initial="hidden"
      animate="show"
      className="cards__digits-display"
    >
      <div className="cards__title">card</div>
      <div className="cards__chip" />
      <div className="cards__numbers">
        <span className="cards__static">xxxx</span>
        <span className="cards__static">xxxx</span>
        <span className="cards__static">xxxx</span>
        <span className="cards__static">{digits}</span>
      </div>
      <div className="cards__bottom">
        <span className="cards__name">{name}</span>
        {type === "AMEX" && (
          <img
            className="cards__png-big"
            src={amex}
            alt="credit card company brand"
          />
        )}
        {type === "VISA" && (
          <img
            className="cards__png-big"
            src={visa}
            alt="credit card company brand"
          />
        )}
        {type === "MASTERCARD" && (
          <img
            className="cards__png-big"
            src={mastercard}
            alt="credit card company brand"
          />
        )}
      </div>
    </motion.div>
  );
};

export default Card;
