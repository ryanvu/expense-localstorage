import "./App.scss";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import ProfileEntry from "./Pages/ProfileEntry/ProfileEntry";
import { AnimatePresence } from "framer-motion";
import { UserProvider } from "./contexts/UserContext";

import Cards from "./Pages/Cards/Cards";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Expense from "./Pages/Expense/Expense";

function App() {
  const location = useLocation();
  return (
    <UserProvider>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={ProfileEntry} />
          <Route path="/card/:id" component={Expense} />
          <Route path="/cards" component={Cards} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </AnimatePresence>
    </UserProvider>
  );
}

export default App;
