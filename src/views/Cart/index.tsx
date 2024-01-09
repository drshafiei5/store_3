import React from "react";
import { Box, Button, Container, Typography, ButtonGroup } from "@mui/material";
import { Table, TableBody, TableHeader } from "../../components/Table";
import CartTableRow from "../../sections/cart/CartTableRow";
import { selectCartItems } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../utils/store";

type CartTableProps = {};

const CartTable: React.FC<CartTableProps> = () => {
  const cartItems = useAppSelector(selectCartItems);

  const headCells = [
    { id: "id", label: "#" },
    { id: "title", label: "عنوان محصول" },
    { id: "price", label: "قیمت", numeric: true },
    { id: "image", label: "تصویر" },
    { id: "", label: "عملیات" },
  ];
  return (
    <Container maxWidth="xl">
      <Typography variant="h6" color="primary" textAlign="center">
        سبد خرید شما
      </Typography>
      {cartItems.length > 0 ? (
        <Table size="small" aria-label="purchases">
          <TableHeader headCells={headCells} />
          <TableBody>
            {[...cartItems]
              .sort(function (a, b) {
                return b.id - a.id;
              })
              .map((CartRow) => (
                <CartTableRow key={CartRow.id} row={CartRow} />
              ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="span" color="error" textAlign="center">
          سبد خرید شما خالی است
        </Typography>
      )}
    </Container>
  );
};

export default CartTable;
