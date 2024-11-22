import { TextField } from "@mui/material";

export const TextInput = (props: any) => {
  return (
    <TextField
      {...props}
      disabled={props.isDisabled}
      size="small"
      sx={{
        mt: 2,
        "& .MuiInputBase-root": {
          height: props.height || 36,
        },
        "& .MuiInputLabel-root": {
          fontSize: "12px",
        },
        "& .MuiInputBase-input": {
          padding: props.padding || "14px",
          fontSize: 14,
        },
        width: props.width || "100%",
      }}
    ></TextField>
  );
};
