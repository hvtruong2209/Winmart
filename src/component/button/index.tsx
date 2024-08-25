import Button from "@mui/joy/Button";

export const ButtonCustom = (props: any) => {
  return props.type === "secondary" ? (
    <Button
      {...props}
      slotProps={{
        root: {
          sx: {
            fontSize: "14px",
            width: "100%",
            mt: 2,
            backgroundColor: "white",
            border: "1px solid rgb(237, 28, 36)",
            color: props.colorText || "rgb(237, 28, 36)",
            fontWeight: 400,
            "&:hover": {
              backgroundColor: "white",
              // color: "white",
            },
          },
        },
      }}
    >
      {props.textButton}
    </Button>
  ) : (
    <Button
      {...props}
      slotProps={{
        root: {
          sx: {
            fontSize: "14px",
            width: "100%",
            mt: 2,
            backgroundColor: "rgb(237, 28, 36)",
            fontWeight: 400,
            "&:hover": {
              backgroundColor: "rgb(237, 28, 36)",
              // color: "rgb(237, 28, 36)",
            },
          },
        },
      }}
    >
      {props.textButton}
    </Button>
  );
};
