import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  type: "success",
  text: "",
  handleClose: () => {},
};

const toastSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setOpenToast: (state, action) => {
      state.open = action.payload;
    },
    showToast: (state, action) => {
      const handleClose = () => {
        if (action.payload.handleClose) {
          action.payload.handleClose();
        }
      };
      state.open = true;
      state.type = action.payload.type;
      state.text = action.payload.text;
      state.handleClose = handleClose;
    },
  },
});

export const { showToast, setOpenToast } = toastSlice.actions;
export default toastSlice.reducer;
