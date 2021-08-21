import React, { useState, useEffect } from "react";
import Card from "../../component/Card/Card";
import "./Expense.scss";
import { useUserContext } from "../../contexts/UserContext";
import { useLocation } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Input from "../../component/Input/Input";

//assets
//images

const Expense = () => {
  const { userInfo, cards, myCategories } = useUserContext();
  const [cardInfo, setcardInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { formData, handleInputChange, handleSubmit } = useForm(
    {
      item: "",
      amount: "",
      category: "",
    },
    () => {
      console.log(formData);
    }
  );
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
          <h3 onClick={handleSubmit} className="expense__list-title">
            transactions
          </h3>
        </div>
        <div className="expense__add">
          <div className="expense__add-top">
            <div onClick={toggle} className="expense__add-title">
              <span>Add expense</span>
              {showForm ? <span>"-"</span> : <span>"+"</span>}
            </div>
            {showForm && (
              <form className="expense__add-form">
                <Input
                  expense
                  label="Item"
                  name="item"
                  value={formData.item}
                  onChange={handleInputChange}
                />
                <Input
                  expense
                  label="Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
                <label>Category</label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {myCategories.map((cat, i) => {
                    return (
                      <option key={i} value={cat}>
                        {cat[0].toUpperCase() + cat.slice(1, cat.length)}
                      </option>
                    );
                  })}
                </select>
                <button>Add</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
