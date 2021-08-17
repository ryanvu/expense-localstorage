import React, { useState } from "react";

const useForm = (initialState = {}, submitCallback) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCallback?.(formData);
  };
  return { formData, handleInputChange, handleSubmit };
};

export default useForm;
