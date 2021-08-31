import { useState } from "react";

const useForm = (initialState, submitCallback) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(initialState);
    submitCallback?.(formData);
  };
  return { formData, handleInputChange, handleSubmit, handleRadioChange };
};

export default useForm;
