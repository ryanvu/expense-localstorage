import React from "react";
import "./MyCards.scss";
import { useUserContext } from "../../contexts/UserContext";
import Card from "../Card/Card";
import { motion, AnimatePresence } from "framer-motion";

const staggerVariant = {
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};
const MyCards = () => {
  const { cards, userInfo } = useUserContext();

  if (cards.length === 0) {
    return (
      <div className="mycards">
        <h3>No cards on your account yet</h3>
      </div>
    );
  }

  return (
    <div className="mycards">
      <h3 className="mycards__title">your cards</h3>
      <motion.div variants={staggerVariant} className="mycards__container">
        <AnimatePresence>
          {cards.map((card) => {
            return (
              <Card
                key={card.id}
                digits={card.card4digits}
                type={card.creditCompany}
                name={userInfo.first + " " + userInfo.last}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MyCards;
