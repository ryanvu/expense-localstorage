import React, { useState, useEffect, useMemo } from "react";
import Card from "../../component/Card/Card";
import "./Expense.scss";
import { useUserContext } from "../../contexts/UserContext";
import { useLocation } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Input from "../../component/Input/Input";
import Transaction from "../../component/Transaction/Transaction";
import plus from "../../assets/svg/plus.svg";

import CategoryModal from "../../component/CategoryModal/CategoryModal";

//assets
//images

const Expense = () => {
  const {
    userInfo,
    cards,
    myCategories,
    addTransaction,
    deleteTransaction,
    expenseList,
  } = useUserContext();
  const [cardInfo, setcardInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [categories, showCategories] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { formData, handleInputChange, handleSubmit } = useForm(
    {
      item: "",
      amount: 0,
      category: "",
    },
    () => {
      const newExpense = {
        id: Date.now(),
        card_digits: digits,
        ...formData,
      };
      addTransaction(newExpense);
    }
  );
  const location = useLocation();
  const digits = location.pathname.split("/")[2];

  const thisCardsData = useMemo(
    () =>
      expenseList.filter((d) => {
        return d.card_digits === digits;
      }),
    [expenseList, digits]
  );

  const amountTotal = useMemo(() => {
    const amounts = thisCardsData.map((i) => {
      return parseFloat(i.amount);
    });

    return amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  }, [thisCardsData]);

  useEffect(() => {
    const card = cards.findIndex((c) => {
      return c.card4digits === digits;
    });
    setcardInfo(cards[card]);
    setLoading(false);
  }, [cards, digits]);

  useEffect(() => {
    setTransactions(thisCardsData);
  }, [addTransaction, thisCardsData]);

  const toggle = () => {
    setShowForm((prev) => !prev);
  };

  const categoryToggle = () => {
    showCategories((prev) => !prev);
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
          <div className="expense__list-headers">
            <span>Item</span>
            <span>Amount</span>
            <span>Category</span>
            <span> </span>
          </div>
          {transactions.length > 0 ? (
            transactions.map((t, i) => {
              return (
                <Transaction
                  key={i}
                  id={t.id}
                  handleClick={deleteTransaction}
                  item={t.item}
                  category={t.category}
                  amount={t.amount}
                />
              );
            })
          ) : (
            <p>"You have no transactions listed"</p>
          )}
        </div>
        <div className="expense__add">
          <div className="expense__add-top">
            <div onClick={toggle} className="expense__add-title">
              <span>Add expense</span>
              {showForm ? <span>"-"</span> : <span>"+"</span>}
            </div>
            {showForm && (
              <form onSubmit={handleSubmit} className="expense__add-form">
                <Input
                  expense
                  label="Item"
                  name="item"
                  value={formData.item}
                  onChange={handleInputChange}
                />
                <Input
                  expense
                  number
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
                <span onClick={categoryToggle} className="category__btn">
                  add category
                  <img
                    className="category__btn-svg"
                    src={plus}
                    alt="plus svg"
                  />
                </span>
                {categories && <CategoryModal toggle={categoryToggle} />}
                <button disabled={categories}>Add</button>
              </form>
            )}
          </div>
          <div className="expense__add-bottom">
            <p className="expense__total">TOTAL: ${amountTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
