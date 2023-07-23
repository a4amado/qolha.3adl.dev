import Search from "./search";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar sx={{ boxShadow: "none", bgcolor: "wheat" }} className="border-b border-black">
            <Toolbar className="flex gap-2 w-full mx-5 align-middle p-1 ">
                <Typography component="h1" className="self-center text-black">
                    Qolha
                </Typography>
                <Search />
            </Toolbar>
        </AppBar>
    );
}
