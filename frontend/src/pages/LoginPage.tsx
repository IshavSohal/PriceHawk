import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert, Container } from '@mui/material';
import { useNavigate } from 'react-router';

export default function SignInButton() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState<null | string>(null);

    async function handleLogin() {
        const res = await fetch("http://localhost:8000/token-auth/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });

        if (res.status === 200) {
            const data = await res.json();
            await storeToken(data["token"]);
            navigate("/");
        } else {
            setAlert(await res.text())
        }
    }

    return (
        <Container>
            {alert !== null &&
                <Alert severity="error">
                    {alert}
                </Alert>
            }

            <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Enter Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                margin="dense"
                id="password"
                label="Enter Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
            />

      <Button onClick={() => navigate("/")}>Cancel</Button>
      <Button onClick={handleLogin}>Submit</Button>
      <Button onClick={() => navigate("/forgot-password1")}>Forgot Password</Button>
    </Container>
  );

}

async function storeToken(token: string) {
    await chrome.storage.local.set({ "token": token });
}