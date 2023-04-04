import { Alert, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getToken } from "../utilities/session";

export default function Settings() {
    const navigate = useNavigate()
    const [alert, setAlert] = useState("")
    const [open, setOpen] = useState(false)

    const [email, setEmail] = useState("")
    const [othermail, setOthermail] = useState("")
    const [password, setPassword] = useState("")
    const [emailnotifications, setEmailNotifications] = useState(false)
    const [priceInterval, setPriceInterval] = useState(12)
    const [google, setGoogle] = useState(false)

    useEffect(() => {
        async function userSettings() {
            const response = await fetch("http://localhost:8000/users/current", {
                method: "GET",
                headers: {
                    "Authorization": `Token ${await getToken()}`
                }
            })

            if (response.status === 200) {
                const values = await response.json()
                setEmail(values.email)
                setEmailNotifications(values.emailnotifications)
                setPriceInterval(values.priceInterval)
                setGoogle(values.google)
                setOthermail(values.email)
            }
        }
        userSettings()
    }, []);

    async function settingsChanges() {
        const sendBody = {
            emailnotifications: emailnotifications,
            priceInterval: priceInterval,
        }
        if (othermail !== email) {
            sendBody.email = email
            sendBody.username = email
            setOthermail(email)
        }
        if (password) {
            sendBody.password = password
        }
        const response = await fetch("http://localhost:8000/users/change/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${await getToken()}`
            },
            body: JSON.stringify(sendBody)
        }).then((res) => res.json())

        if (response.google !== undefined) {
            setAlert("Account Settings Changed Successfully")
            setTimeout(() => setAlert(""), 2125)
        }
        else
            setAlert(response.email[0])

        setOpen(false)
    }

    function check() {
        if (!email) {
            if (!alert.includes("Email"))
                setAlert(alert + "Email must be filled. ")
            return false
        }
        else if (email && alert.includes("Email")) {
            setAlert(alert.replace("Email must be filled. ", ""))
        }

        if (isNaN(priceInterval) || priceInterval < 0 || priceInterval > 24) {
            if (!alert.includes("Price"))
                setAlert(alert + "Price Interval must be between 1 and 24. ")
            return false
        }
        else if ((!isNaN(priceInterval) && priceInterval >= 0 && priceInterval <= 24) && alert.includes("Price")) {
            setAlert(alert.replace("Price Interval must be between 1 and 24. ", ""))
        }

        return true
    }

    return <Container>
        {alert &&
            <Alert severity={(alert.includes("must be") || alert.includes("already exists") || alert.includes("email")) ? "error" : "success"}>
                {alert}
            </Alert>
        }

        {!google &&
            <>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    color={email ? "success" : "error"}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={password}
                    color="success"
                    helperText="An empty password field means your password remain the same"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </>
        }

        <FormControlLabel control={<Checkbox checked={emailnotifications} onChange={() => setEmailNotifications(!emailnotifications)} />} label="Email Push Notifications" />

        <TextField
            margin="dense"
            id="price-update-interval"
            label="Price Update Interval"
            type="number"
            fullWidth
            variant="standard"
            value={priceInterval}
            color={(!priceInterval || priceInterval < 0 || priceInterval > 24) ? "error" : "success"}
            onChange={(e) => setPriceInterval(parseInt(e.target.value))}
        />
        <br />
        <br />
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button onClick={() => {
            if (check()) {
                setOpen(true)
            }
        }}>Make Changes</Button>

        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Make Changes
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to make these changes to your account?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>No</Button>
                <Button onClick={() => settingsChanges()} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    </Container>
}