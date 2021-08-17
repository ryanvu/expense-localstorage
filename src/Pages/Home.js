import React from "react";
import "./Home.scss";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
const Home = () => {
  const history = useHistory();

  return (
    <motion.div
      exit={{ x: "-100vh", transition: { duration: 1.5 } }}
      className="home"
    >
      <h1 className="home__title">expense.</h1>
      <button
        onClick={() => {
          history.push("/profile");
        }}
        className="home__button"
      >
        get started
      </button>
    </motion.div>
  );
};

export default Home;
