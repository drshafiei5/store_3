import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import Backdrop from "../Backdrop";

type ModalProps = DialogProps & {
  isLoading?: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  isLoading = false,
  children,
}) => {
  return (
    <>
      {isLoading ? (
        <Backdrop open={true} sx={{ zIndex: 9999 }} />
      ) : (
        <Dialog className="modal" onClose={onClose} open={open} keepMounted>
          <DialogTitle>
            {title}
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          {children}
        </Dialog>
      )}
    </>
  );
};

export default Modal;
