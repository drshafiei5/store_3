import { Add, ArrowBackIos, Circle, Remove } from "@mui/icons-material";
import {
  TableCell,
  TableRow,
  Box,
  Tooltip,
  Button,
  ButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addToCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  selectProduct,
} from "../../store/cartSlice";
import { ProductType } from "../../types";
import { useAppDispatch, useAppSelector } from "../../utils/store";

type CartTableRowProps = {
  row: ProductType;
};

const CartTableRow: React.FC<CartTableRowProps> = ({ row }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectProduct(row.id));

  const handleRemoveItem = (product) => {
    dispatch(decreaseCartQuantity(product));
  };

  const handleAddItem = (product) => {
    dispatch(increaseCartQuantity(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row" align="center">
        {row.id}
      </TableCell>
      <TableCell align="center">{row.title}</TableCell>
      <TableCell align="center">{row.price}</TableCell>
      <TableCell align="center">
        <Box
          component="img"
          sx={{ height: 50, maxHeight: { xs: 50 } }}
          alt={row.title}
          src={row.image}
        />
      </TableCell>
      <TableCell>
        {!cartItem?.cartQuantity || cartItem?.cartQuantity === 0 ? (
          <Button
            ButtonGroup
            size="small"
            variant="outlined"
            onClick={() => {
              handleAddToCart(row);
            }}
          >
            افزودن به سبد خرید
          </Button>
        ) : (
          <ButtonGroup size="small" variant="outlined">
            <Button
              onClick={() => {
                handleAddItem(row);
              }}
            >
              <Add color="primary" />
            </Button>
            <Button>{cartItem?.cartQuantity || 0}</Button>
            <Button
              onClick={() => {
                handleRemoveItem(row);
              }}
            >
              <Remove color="primary" />
            </Button>
          </ButtonGroup>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CartTableRow;
