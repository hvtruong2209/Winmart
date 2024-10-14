import { Button } from "@mui/material";

export const ButtonCustom = (props: any) => {
  return props.type === "secondary" ? (
    <Button
      {...props}
      sx={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        width: props.width ? props.width : "100%",
        mt: 2,
        backgroundColor: "white",
        border: "1px solid rgb(237, 28, 36)",
        color: props.colorText || "rgb(237, 28, 36)",
        fontWeight: props.fontWeight || 400,
        "&:hover": {
          backgroundColor: "white",
          // color: "white",
        },
      }}
    >
      {props.children ? props.children : props.textButton}
    </Button>
  ) : (
    <Button
      {...props}
      sx={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        width: props.width ? props.width : "100%",
        mt: 2,
        backgroundColor: "rgb(237, 28, 36)",
        color: "white",
        fontWeight: props.fontWeight || 400,
        "&:hover": {
          backgroundColor: "rgb(237, 28, 36)",
          // color: "rgb(237, 28, 36)",
        },
      }}
    >
      {props.children ? props.children : props.textButton}
    </Button>
  );
};
