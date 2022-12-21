import { AppBar, Container, Toolbar, Autocomplete, Typography, TextField } from "@mui/material"
export default function Page() {
    return <Container>
        <AppBar>
            <Toolbar>
                <Autocomplete options={[1, 2, 3, 4, 5, 6]} renderInput={(params) => <TextField  {...params} label="Movie" />}
                
                />
            </Toolbar>
        </AppBar>
    </Container>
}