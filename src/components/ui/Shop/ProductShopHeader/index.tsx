import React, { useState } from "react";
import { Button } from "@mui/material";
import AddProduct from "./AddProduct";

const ProductShopHeader = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div>
      <Button variant="outlined"  onClick={() => setShowAddModal(true)}>
        اضافه کردن محصول
      </Button>
      {showAddModal && (
        <AddProduct
          open={showAddModal}
          onClose={() => {
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductShopHeader;
