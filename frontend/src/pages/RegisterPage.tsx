import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import { getFingerPrintChrome } from '../utilities/session';

export default function SignInButton() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailVerify, setEmailVerify] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [alert, setAlert] = useState<null | string>(null);

    async function handleRegister() {
        if (email !== emailVerify || password !== passwordVerify) {
            return;
        }

        const res = await fetch("http://localhost:8000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: email,
                email: email,
                password: password
            })
        });

        if (res.status === 201) {
            await fetch("http://localhost:8000/users/migrate/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    guestid: await getFingerPrintChrome()
                })
            })
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
                error={email !== emailVerify}
                margin="dense"
                id="email"
                label="Re-Enter Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={(e) => setEmailVerify(e.target.value)}
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
            <TextField
                error={password !== passwordVerify}
                margin="dense"
                id="password"
                label="Re-enter Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={(e) => setPasswordVerify(e.target.value)}
            />

            <Button onClick={() => navigate("/")}>Cancel</Button>
            <Button onClick={handleRegister}>Submit</Button>
        </Container>
    );
}