import React from "react";
import { productType } from "../../../types";
import { Table, TableBody, TableHeader } from "../../../Table";
import ProductTableRow from "./ProductTableRow";

type ProductTableProps = {
  products: productType[];
  roomNumber: string | number;
};

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  roomNumber,
}) => {
  const headCells = [
    { id: "id", label: "#" },
    { id: "title", label: "عنوان محصول" },
    { id: "price", label: "قیمت", numeric: true },
    { id: "category", label: "دسته بندی" },
    { id: "image", label: "تصویر" },
    { id: "rating", label: "امتیاز", numeric: true },
    { id: "", label: "عملیات" },
  ];
  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHeader headCells={headCells} />
        <TableBody>
          {[...products]
            .sort(function (a, b) {
              return b.id - a.id;
            })
            .map((productRow) => (
              <ProductTableRow key={productRow.id} row={productRow} />
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductTable;
