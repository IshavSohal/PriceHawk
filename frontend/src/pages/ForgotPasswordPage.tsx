import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert, Container } from '@mui/material';
import { useNavigate } from 'react-router';

export default function ForgotPassword(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [alert, setAlert] = useState<null | string>(null);

    async function handleForgotPassword(){
        if (password !== passwordVerify) {
            return;
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
            label="Enter New Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
            margin="dense"
            id="password"
            label="Re-enter New Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPasswordVerify(e.target.value)}
            />
    
            <Button onClick={() => navigate("/login")}>Cancel</Button>
            <Button onClick={handleForgotPassword}>Submit</Button>
        </Container>
    );
}