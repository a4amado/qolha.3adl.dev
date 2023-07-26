import { ButtonProps, Button } from "@mui/material";

export default function SolidButton(props: ButtonProps) {
    return (
        <Button
            {...props}
            sx={{
                borderRadius: "0",
                padding: "0px 10px",
                border: "1px solid balck",
                ":focus": {
                    outline: "none",
                },
                ...props.sx,
            }}
        >
            {props.children}
        </Button>
    );
}
