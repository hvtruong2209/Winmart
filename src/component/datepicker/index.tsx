import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const DatePickerInput = (props: any) => {
  return (
    <DatePicker
      slotProps={{
        textField: {
          sx: {
            mt: 2,
            "& .MuiInputBase-root": {
              height: 36,
            },
            "& .MuiInputLabel-root": {
              fontSize: "12px",
              top: "-6px",
            },
            "& .MuiInputBase-input": {
              padding: "14px",
              fontSize: "12px",
            },
            width: "100%",
          },
        },
      }}
    />
  );
};
