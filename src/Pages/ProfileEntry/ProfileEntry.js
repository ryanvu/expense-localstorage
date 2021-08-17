import React from "react";
import "./ProfileEntry.scss";
import { motion } from "framer-motion";
import Input from "../../component/Input/Input";
const ProfileEntry = () => {
  return (
    <motion.div
      className="profile"
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 1.5 }}
    >
      <h1 className="profile__title">who are you?</h1>
      <Input placeholder="first name..." />
      <Input placeholder="last name..." />

      <button className="profile__btn">next</button>
    </motion.div>
  );
};

export default ProfileEntry;
