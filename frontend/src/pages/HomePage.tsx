import { Button, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Stack
        style={{width: "200px"}}
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={1}>
      <Button
          variant="text"
          onClick={() => navigate("/add-item")}>
        Add-Item
      </Button>
    </Stack>
  );
}