import React, { useState, useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import categoryContext from "../context/categories/categoryContext";

const FormNote = () => {
  const notesContext = useContext(noteContext);
  const { selectednote, errorform, addNote, showError, updateNote } =
    notesContext;

  const categoriesContext = useContext(categoryContext);
  const { categories, getCategories, addCategory } = categoriesContext;

  const [categoriesSaved, setCategoriesSaved] = useState([]);

  useEffect(() => {
    getCategories();
    if (selectednote !== null) {
      saveNote(selectednote);
    } else {
      saveNote({
        title: "",
        description: "",
        categories: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectednote]);

  const [note, saveNote] = useState({
    title: "",
    description: "",
    categories: [],
  });

  const { title, description } = note;

  const handleChange = (e) => {
    saveNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const submitNote = (e) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      showError();
      return;
    }

    if (selectednote === null) {
      addNote({ ...note, categories: categoriesSaved });
    } else {
      updateNote(note);
    }

    saveNote({
      title: "",
      description: "",
    });
  };

  const saveCategory = (e) => {
    e.preventDefault();
    let categoryInput = document.getElementById("category-input");
    addCategory({ name: categoryInput.value });
    categoryInput.value = "";
  };

  const handleCategories = (e, id) => {
    let { value, checked } = e.target;
    if (checked) {
      setCategoriesSaved([...categoriesSaved, { name: value, _id: id }]);
    } else {
      setCategoriesSaved(categoriesSaved.filter((e) => e !== value));
    }
  };

  return (
    <>
      <div className="container container-title mb-5">
        <h1 className="title-second">
          Your<span className="title-second-span">Notes</span>
        </h1>
      </div>

      <div className="form-bg">
        <div className="container">
          <div className="row">
            <form className="form-horizontal container" onSubmit={submitNote}>
              <span className="heading">CREATE NOTES</span>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                  value={title}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                  value={description}
                ></textarea>
              </div>

              <div className="form-group">
                <div className="container">
                  <h1 className="h1-categories">Categories</h1>
                  {categories.map((category) => (
                    <>
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          value={category.name}
                          onClick={(e) => handleCategories(e, category._id)}
                        />
                        <label className="form-check-label">
                          {category.name}
                        </label>
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <input
                    type="text"
                    placeholder="New category"
                    className="form-control"
                    id="category-input"
                    name="categories"
                  />
                </div>
                <div className="col-auto">
                  <button className="btn" onClick={saveCategory}>
                    add category
                  </button>
                </div>
              </div>

              <div className="form-group mt-3">
                <input
                  type="submit"
                  className="btn"
                  value={selectednote ? "Edit note" : "Add note"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {errorform ? (
        <div className="container">
          <div className="alert alert-danger mt-3" role="alert">
            All fields are required
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FormNote;
