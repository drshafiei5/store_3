import {
  IconButton,
  TableCell,
  TableRow,
  Box,
  Tooltip,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { ProductType } from "../../../types";
import EditProduct from "./EditProduct";
import ShowProduct from "./ShowProduct";
import { useAppDispatch } from "../../../../utils/store";
import { removeProduct } from "../../../../store/productsSlice";

type ProductTableRowProps = {
  row: ProductType;
};

const ProductTableRow: React.FC<ProductTableRowProps> = ({ row }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleRemoveProduct = () => {
    dispatch(removeProduct(row.id));
  };

  const handleEditProduct = () => {
    setShowEditModal(true);
  };

  const handleViewProduct = () => {
    setShowViewModal(true);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row" align="center">
        {row.id}
      </TableCell>
      <TableCell align="center">{row.title}</TableCell>
      <TableCell align="center">{row.price}</TableCell>
      <TableCell align="center">{row.category}</TableCell>
      <TableCell align="center">
        <Box
          component="img"
          sx={{ height: 50, maxHeight: { xs: 50 } }}
          alt={row.title}
          src={row.image}
        />
      </TableCell>
      <TableCell align="center">{row?.rating?.rate || 0}</TableCell>
      <TableCell>
        <Stack direction="row">
          <Tooltip title="مشاهده" disableInteractive={true}>
            <IconButton
              aria-label="expand row"
              size="large"
              color="primary"
              onClick={handleViewProduct}
            >
              <VisibilityIcon />
            </IconButton>
            {showViewModal && (
              <ShowProduct
                open={showViewModal}
                onClose={() => {
                  setShowViewModal(false);
                }}
                product={row}
              />
            )}
          </Tooltip>
          <Tooltip title="حذف" disableInteractive={true}>
            <IconButton
              aria-label="expand row"
              size="large"
              color="error"
              onClick={handleRemoveProduct}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="ویرایش" disableInteractive={true}>
            <IconButton
              aria-label="expand row"
              size="large"
              color="primary"
              onClick={handleEditProduct}
            >
              <EditIcon />
            </IconButton>
            {showEditModal && (
              <EditProduct
                open={showEditModal}
                onClose={() => {
                  setShowEditModal(false);
                }}
                product={row}
              />
            )}
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
