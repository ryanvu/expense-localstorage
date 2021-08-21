import React from "react";
import "./ProfileEntry.scss";
import { motion } from "framer-motion";
import Input from "../../component/Input/Input";
import useForm from "../../hooks/useForm";
import { useUserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

const ProfileEntry = () => {
  const history = useHistory();
  const { setUserInfo } = useUserContext();
  const { formData, handleInputChange, handleSubmit } = useForm(
    {
      first: "",
      last: "",
    },
    () => {
      setUserInfo(formData);
      history.push("/cards");
    }
  );
  const { first, last } = formData;
  return (
    <motion.div
      className="profile"
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 1.5 }}
    >
      <h1 className="profile__title">who are you?</h1>
      <form onSubmit={handleSubmit} className="profile__form">
        <Input
          name="first"
          placeholder="first name..."
          onChange={handleInputChange}
          value={first}
        />
        <Input
          name="last"
          placeholder="last name..."
          onChange={handleInputChange}
          value={last}
        />

        <button className="profile__btn">next</button>
      </form>
    </motion.div>
  );
};

export default ProfileEntry;
