import "./App.scss";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import ProfileEntry from "./Pages/ProfileEntry/ProfileEntry";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={ProfileEntry} />
      </Switch>
    </AnimatePresence>
  );
}

export default App;
