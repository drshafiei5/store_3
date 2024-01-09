import { Add, ArrowBackIos, Circle, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Rating,
  Tooltip,
  Typography,
  DialogContent,
  useMediaQuery,
  ButtonGroup,
} from "@mui/material";
import React from "react";
import { theme } from "../../../../theme";
import {
  addToCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  selectProduct,
  getTotal,
} from "../../../../store/cartSlice";

import Modal from "../../../Modal";
import { useAppDispatch, useAppSelector } from "../../../../utils/store";

const ShowProduct = ({ open, onClose, product }) => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cartItem = useAppSelector(selectProduct(product.id));

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
    <Modal open={open} onClose={onClose} title="مشاهده محصول">
      <DialogContent>
        <Box>
          {product != null && (
            <Box>
              <Typography variant="h6" color="primary" textAlign="center">
                {product.title}
              </Typography>

              <Box
                display="flex"
                justifyContent="center"
                flexDirection={isMobile ? "column" : "row"}
              >
                <Box
                  py={1}
                  mx={2}
                  width="40%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Box
                    component="img"
                    sx={{ objectFit: "contain" }}
                    src={product.image}
                    alt={product.title}
                    width="100%"
                  />

                  <Typography variant="caption" component="h6">
                    Price: {product.price}
                  </Typography>
                </Box>
                <Box py={2} mx={2} width="60%">
                  <Typography gutterBottom pb={2}>
                    توضیحات:
                    <br />
                    {product.description}
                  </Typography>

                  {product.category && (
                    <Typography gutterBottom>
                      دسته بندی: {product.category}
                    </Typography>
                  )}

                  <Typography gutterBottom>
                    امتیاز:
                    <Rating
                      value={product?.rating?.rate || 0}
                      name="product_rating"
                      readOnly
                      size="middle"
                      sx={{ verticalAlign: "middle" }}
                    />
                  </Typography>

                  <Box mt={5}>
                    {!cartItem?.cartQuantity || cartItem?.cartQuantity === 0 ? (
                      <Button
                        ButtonGroup
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          handleAddToCart(product);
                        }}
                      >
                        افزودن به سبد خرید
                      </Button>
                    ) : (
                      <ButtonGroup size="small" variant="outlined">
                        <Button
                          onClick={() => {
                            handleAddItem(product);
                          }}
                        >
                          <Add color="primary" />
                        </Button>
                        <Button>{cartItem?.cartQuantity || 0}</Button>
                        <Button
                          onClick={() => {
                            handleRemoveItem(product);
                          }}
                        >
                          <Remove color="primary" />
                        </Button>
                      </ButtonGroup>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Modal>
  );
};

export default ShowProduct;
