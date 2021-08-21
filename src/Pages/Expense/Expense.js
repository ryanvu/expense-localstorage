import React, { useState, useEffect } from "react";
import Card from "../../component/Card/Card";
import "./Expense.scss";
import { useUserContext } from "../../contexts/UserContext";
import { useLocation } from "react-router-dom";
import Input from "../../component/Input/Input";

//assets
//images

const Expense = () => {
  const { userInfo, cards } = useUserContext();
  const [cardInfo, setcardInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const digits = location.pathname.split("/")[2];

  useEffect(() => {
    const card = cards.findIndex((c) => {
      return c.card4digits === digits;
    });
    setcardInfo(cards[card]);
    setLoading(false);
  }, [cards, digits]);

  const toggle = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="expense">
      {!loading && (
        <div className="expense__card">
          <Card
            name={userInfo.first + " " + userInfo.last}
            digits={cardInfo.card4digits}
            type={cardInfo.creditCompany}
          />
          <div className="expense__details">
            <p>{cardInfo.creditCompany}</p>
          </div>
        </div>
      )}
      <div className="expense__transactions">
        <div className="expense__list">
          <h3 className="expense__list-title">transactions</h3>
        </div>
        <div className="expense__add">
          <div className="expense__add-top">
            <h3 onClick={toggle} className="expense__add-title">
              Add expense
            </h3>
            {showForm && (
              <form className="expense__add-form">
                <Input name="Transaction" />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
