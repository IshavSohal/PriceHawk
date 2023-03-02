import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert, Container } from '@mui/material';
import { useNavigate } from 'react-router';

export default function ForgotPassword1(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState<null | string>(null);

    async function handleForgotPassword1(){
      
        const res = await fetch("http://localhost:8000/users/reset-password/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: email,
          })
        });
    
        if (res.status === 200) {
          navigate("/forgot-password2");
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

    
            <Button onClick={() => navigate("/login")}>Cancel</Button>
            <Button onClick={handleForgotPassword1}>Submit</Button>
        </Container>
    );
}