import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert, Container } from '@mui/material';
import { useNavigate } from 'react-router';

export default function ForgotPassword2(){
    const navigate = useNavigate();
    const [key, setKey] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [alert, setAlert] = useState<null | string>(null);

    async function handleForgotPassword2(){
        if (password !== passwordVerify) {
            return;
        }

        const res = await fetch("http://localhost:8000/users/changepassword/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              password: password,
              key: key
            })
          });
      
          if (res.status === 200) {
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
              margin="dense"
              id="key"
              label="Enter Key (check email)"
              type="key"
              fullWidth
              variant="standard"
              onChange={(e) => setKey(e.target.value)}
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
            <Button onClick={handleForgotPassword2}>Submit</Button>
        </Container>
    );
}