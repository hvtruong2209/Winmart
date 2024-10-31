import { AlertColor, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { setOpenToast } from "../../redux/toastSlice";
interface IToast {
  open: boolean;
  handleClose?: () => void;
  type?: AlertColor;
  text: string;
}
export const Toast = (props: IToast) => {
  const dispatch = useDispatch();

  const onClose = () => {
    props.handleClose && props.handleClose();
    dispatch(setOpenToast(false));
  };

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={props.type || "success"} sx={{ width: "100%" }}>
        {props.text}
      </Alert>
    </Snackbar>
  );
};
