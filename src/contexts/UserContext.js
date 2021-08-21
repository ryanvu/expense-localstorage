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
  const values = {
    userInfo,
    setUserInfo,
    cards,
    addCard,
    expenseList,
    addTransaction,
    myCategories,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
