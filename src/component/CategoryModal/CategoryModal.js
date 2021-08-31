import React, { useEffect, useRef, useState, useCallback } from "react";
import { useUserContext } from "../../contexts/UserContext";
import minus from "../../assets/svg/minus.svg";
import { SketchPicker } from "react-color";

const CategoryModal = ({ toggle }) => {
  const { myCategories, addCategory, deleteCategory } = useUserContext();
  const categoryInputRef = useRef();
  const [error, setError] = useState();
  const [color, setColor] = useState("#ffaaff");
  const [displayPicker, setDisplayPicker] = useState(false);

  const handleSubmit = useCallback(() => {
    if (categoryInputRef.current.value) {
      const newCategory = {
        name: categoryInputRef.current.value,
        color: color,
      };
      addCategory(newCategory);
      categoryInputRef.current.value = "";
    } else {
      setError("No empty fields");
    }
  }, [addCategory, color]);

  const handleChange = (color) => {
    setColor(color.hex);
  };

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
                <div
                  className="category__color"
                  style={{ background: c.color }}
                />
                <span>{c.name}</span>
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
          <div
            className="categories__add-color"
            style={{ background: color }}
            onClick={() => {
              setDisplayPicker((prev) => !prev);
            }}
          />
          {displayPicker && (
            <div
              style={{
                position: "absolute",
                zIndex: "2",
                top: "59%",
                right: "41%",
              }}
            >
              <div
                onClick={() => {
                  setDisplayPicker((prev) => !prev);
                }}
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px",
                }}
              />
              <SketchPicker color={color} onChange={handleChange} />
            </div>
          )}

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
