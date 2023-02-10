import { Button, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}>
      
      <Button
          variant="contained"
          onClick={() => navigate("/signin")}>
        Sign In
      </Button>
      
      <Button
          variant="contained"
          onClick={() => navigate("/register")}>
        Register
      </Button>

      <Button
          variant="contained"
          onClick={() => navigate("/add-item")}>
        Add-Item
      </Button>
    </Stack>
  );
}