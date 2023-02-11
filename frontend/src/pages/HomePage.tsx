import { useState, useEffect } from "react";
import { Button, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router";

type CurrentUserResponse = {
  email: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<CurrentUserResponse | null>(null);

  async function handleLogout() {
    await fetch("http://localhost:8000/users/logout/", {
      method: "POST",
      headers: {
        "Authorization": `Token ${await getToken()}`
      }
    });
    await chrome.storage.local.remove("token");
    setUser(null);
  }

  useEffect(() => {
    async function currentUser() {
      const response = await fetch("http://localhost:8000/users/current/", {
        headers: {
          "Authorization": `Token ${await getToken()}`
        }
      });
      if (response.status === 200) {
        setUser(await response.json());
      } else {
        setUser(null);
      }
    }

    currentUser();
  }, []);

  if (user) {
    return (
      <>
        User: {user.email}
        
        <Stack
            direction="column"
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={1}>
          <Button
              variant="contained"
              onClick={() => navigate("/add-item")}>
            Add-Item
          </Button>
          
          <Button
              variant="contained"
              onClick={() => handleLogout()}>
            Logout
          </Button>
        </Stack>
      </>
    );
  }

  return (
    <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}>
      
      <Button
          variant="contained"
          onClick={() => navigate("/login")}>
        Login
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

async function getToken() {
  const data = await chrome.storage.local.get(["token"]);
  return data.token;
}