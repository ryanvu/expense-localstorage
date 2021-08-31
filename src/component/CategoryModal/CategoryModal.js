import React, { useEffect, useRef, useState, useCallback } from "react";
import { useUserContext } from "../../contexts/UserContext";
import minus from "../../assets/svg/minus.svg";

const CategoryModal = ({ toggle }) => {
  const { myCategories, addCategory, deleteCategory } = useUserContext();
  const categoryInputRef = useRef();
  const [error, setError] = useState();

  const handleSubmit = useCallback(() => {
    if (categoryInputRef.current.value) {
      addCategory(categoryInputRef.current.value);
      categoryInputRef.current.value = "";
    } else {
      setError("No empty fields");
    }
  }, [addCategory]);

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter") {
        if (categoryInputRef.current.value.length > 0) {
          handleSubmit();
        } else {
          setError("No empty fields");
          return;
        }
      }

      if (e.code === "Escape") {
        toggle();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [addCategory, toggle, handleSubmit]);

  return (
    <div className="categories">
      <div className="categories__modal">
        <h3 className="categories__modal-title">your categories</h3>
        <div className="categories__list">
          {myCategories.map((c, i) => {
            return (
              <div key={i} className="category">
                <span>{c}</span>
                <img
                  onClick={() => {
                    deleteCategory(c);
                  }}
                  className="category__btn-svg"
                  src={minus}
                  alt="minus svg"
                />
              </div>
            );
          })}
        </div>
        <div className="categories__add">
          <input
            ref={categoryInputRef}
            className="categories__add-input"
            type="text"
            name="category"
            onChange={() => {
              setError(null);
            }}
          />
          <button
            type="button"
            className="categories__add-btn"
            onClick={() => {
              handleSubmit();
            }}
          >
            add
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
