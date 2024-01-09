import React, { useState } from "react";
import { TextField, FormControl, Button, DialogContent } from "@mui/material";

import Modal from "../../../Modal";
import { useAppDispatch } from "../../../../utils/store";
import { createProduct } from "../../../../store/productsSlice";

const AddProduct = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        title,
        price,
        description: "",
        category,
        image,
        rating: { rate: 0, count: 0 },
      }),
    ).then(() => onClose());
  };

  return (
    <Modal open={open} onClose={onClose} title="افزودن محصول">
      <DialogContent>
        <form autoComplete="off" onSubmit={handleAddProduct}>
          <TextField
            label="عنوان"
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            type="title"
            sx={{ my: 3 }}
            size="small"
            fullWidth
            value={title}
          />
          <TextField
            label="قیمت"
            onChange={(e) => setPrice(e.target.value)}
            variant="outlined"
            type="text"
            value={price}
            fullWidth
            sx={{ mb: 3 }}
            size="small"
          />
          <TextField
            label="دسته بندی"
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            type="text"
            value={category}
            fullWidth
            sx={{ mb: 3 }}
            size="small"
          />
          <TextField
            label="تصویر"
            onChange={(e) => setImage(e.target.value)}
            variant="outlined"
            type="text"
            value={image}
            fullWidth
            sx={{ mb: 3 }}
            size="small"
          />
          <Button variant="outlined" type="submit" fullWidth>
            اضافه کردن محصول
          </Button>
        </form>
      </DialogContent>
    </Modal>
  );
};

export default AddProduct;
