import React, { useState } from "react";
import { TextField, FormControl, Button, DialogContent } from "@mui/material";

import Modal from "../../../Modal";
import { useAppDispatch } from "../../../../utils/store";
import { updateProduct } from "../../../../store/productsSlice";

const EditProduct = ({ open, onClose, product }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price || "");
  const [image, setImage] = useState(product?.image || "");
  const [category, setCategory] = useState(product?.category || "");

  const handleEditProduct = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        ...product,
        title,
        price,
        category,
        image,
      }),
    ).then(() => onClose());
  };

  return (
    <Modal open={open} onClose={onClose} title="ویرایش محصول">
      <DialogContent>
        <form autoComplete="off" onSubmit={handleEditProduct}>
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
            ویرایش محصول
          </Button>
        </form>
      </DialogContent>
    </Modal>
  );
};

export default EditProduct;
