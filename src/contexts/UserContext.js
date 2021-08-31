import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = React.createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useLocalStorage("expense-user-info", {});
  const [cards, setCards] = useLocalStorage("expense-cards-data", []);
  const [expenseList, setExpenseList] = useLocalStorage(
    "expense-transactions",
    []
  );
  const [myCategories, setMyCategories] = useLocalStorage(
    "expense-user-categories",
    ["groceries", "restaurants", "pets", "misc"]
  );

  const addCard = (info) => {
    setCards([...cards, info]);
  };

  const addTransaction = (transactionInfo) => {
    setExpenseList([...expenseList, transactionInfo]);
  };

  const deleteTransaction = (transactionId) => {
    const filtered = expenseList.filter((t) => {
      return t.id !== transactionId;
    });
    console.log(filtered);
    setExpenseList(filtered);
  };
  // categories
  const addCategory = (category) => {
    const newCategory = category.toLowerCase();
    setMyCategories([...myCategories, newCategory]);
  };

  const deleteCategory = (category) => {
    const filtered = myCategories.filter((c) => {
      return c !== category;
    });
    setMyCategories(filtered);
  };

  const values = {
    userInfo,
    setUserInfo,
    cards,
    addCard,
    expenseList,
    addTransaction,
    deleteTransaction,
    myCategories,
    addCategory,
    deleteCategory,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
