import React, { useReducer } from "react";
import categoryContext from "./categoryContext";
import categoryReducer from "./categoryReducer";
import { ADD_CATEGORY, GET_CATEGORIES, DELETE_CATEGORY } from "../../types";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const CategoryState = (props) => {
  const initialState = {
    categories: [],
  };

  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const getCategories = async () => {
    try {
      const result = await clienteAxios.get("/api/categories");
      dispatch({
        type: GET_CATEGORIES,
        payload: result.data.categories,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (category) => {
      console.log(category)
    try {
      const result = await clienteAxios.post("/api/categories", category);
      console.log(result);

      dispatch({
        type: ADD_CATEGORY,
        payload: result.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (_id) => {
    try {
      await clienteAxios.delete(`/api/categories/${_id}`);
      dispatch({
        type: DELETE_CATEGORY,
        payload: _id,
      });
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <categoryContext.Provider
      value={{
        categories: state.categories,
        getCategories,
        addCategory,
        deleteCategory,
      }}
    >
      {props.children}
    </categoryContext.Provider>
  );
};

export default CategoryState;
