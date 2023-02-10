import { Button, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router";

export default function() {
  const navigate = useNavigate();

  return (
    <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={1}>
      <Button
          variant="contained"
          onClick={() => navigate("/signin")}>
        Sign In
      </Button>
      <Button
          variant="text"
          onClick={() => navigate("/register")}>
        Register
      </Button>
    </Stack>
  );
}