import {
  Backdrop as MuiBackdrop,
  BackdropProps as MuiBackdropProps,
} from "@mui/material";
import React from "react";
import Loader from "../Loader";

const Backdrop: React.FC<MuiBackdropProps> = ({ open, ...rest }) => {
  return (
    <MuiBackdrop {...rest} open={open || false}>
      <Loader />
    </MuiBackdrop>
  );
};

export default Backdrop;
