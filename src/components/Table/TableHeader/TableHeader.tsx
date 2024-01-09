import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TableHeadProps as MuiTableHeaderProps,
} from "@mui/material";
import React from "react";

type TableHeadCell<T> = {
  id: keyof T;
  numeric?: boolean;
  disablePadding?: boolean;
  label: string;
};

type TableHeaderProps<T> = MuiTableHeaderProps & {
  headCells: Array<TableHeadCell<T>>;
};

function TableHeader<T>({ headCells }: TableHeaderProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell align="center" key={headCell.id}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
