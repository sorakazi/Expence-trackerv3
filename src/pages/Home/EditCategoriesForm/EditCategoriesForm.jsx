import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

import { updateCategoryThunk } from "../../../redux/category/operations";
import { validationCategoryFormSchema } from "shared/validationSchema/validationSchema";
import { selectError } from "../../../redux/auth/selectors";

import {
  EditCategoriesButton,
  EditCategoriesInput,
  EditCategoriesWrapper,
  EditLabel,
  ErrorMessage,
} from "./EditCategoriesForm.styled";
import { selectCategories } from "../../../redux/category/selectors";

const EditCategoriesForm = ({ setIsEditing, category }) => {
  const categories = useSelector(selectCategories);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryName: category?.categoryName || "",
    },
    resolver: yupResolver(validationCategoryFormSchema),
  });
  const submit = (data) => {
    if (category) {
      let categoryIncomesExsist = "";
      let categoryExpensesExists = "";

      if (categories.incomes) {
        categoryIncomesExsist = categories.incomes.find(
          (category) =>
            category.categoryName.toLowerCase().trim() ===
            data.categoryName.toLowerCase().trim()
        );
      }
      if (categories.expenses) {
        categoryExpensesExists = categories.expenses.find(
          (category) =>
            category.categoryName.toLowerCase().trim() ===
            data.categoryName.toLowerCase().trim()
        );
      }

      if (categoryIncomesExsist || categoryExpensesExists) {
        toast.info(`${data.categoryName} is already in your list.`);
        return;
      } else {
        const updatedCategory = {
          _id: category._id,
          categoryName: { ...data },
        };
        dispatch(updateCategoryThunk(updatedCategory));
      }
      setIsEditing(false);
      if (error === null) {
        reset();
      } else {
        toast.error("Update failed, please try again");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <EditCategoriesWrapper>
        <EditLabel htmlFor="edit">
          Edit Category
          <EditCategoriesInput
            autoComplete="off"
            id="edit"
            type="text"
            placeholder="Enter the text"
            {...register("categoryName")}
          />
          <EditCategoriesButton type="submit">Edit</EditCategoriesButton>
        </EditLabel>
        <ErrorMessage>{errors.categoryName?.message}</ErrorMessage>
      </EditCategoriesWrapper>
    </form>
  );
};

export default EditCategoriesForm;

EditCategoriesForm.propTypes = {
  category: PropTypes.objectOf(PropTypes.string).isRequired,
  setIsEditing: PropTypes.func.isRequired,
};
