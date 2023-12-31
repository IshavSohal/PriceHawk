import { useState, useEffect } from "react";
import { Button, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { getFingerPrintChrome, getToken, setFingerPrintChrome } from '../utilities/session';
import googleSignIn from '../utilities/googleSignIn';
import { ClientJS } from "clientjs"

type CurrentUserResponse = {
    email: string;
}

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState<CurrentUserResponse | null>(null);
    const [fingerprint, setFingerprint] = useState("")

    async function handleLogout() {
        await fetch("http://localhost:8000/users/logout/", {
            method: "POST",
            headers: {
                "Authorization": `Token ${await getToken()}`
            }
        });
        await chrome.storage.local.remove("token");
        chrome.identity?.clearAllCachedAuthTokens(() => { })
        setUser(null);
    }

    useEffect(() => {
        async function currentUser() {
            const token = await getToken()
            if (token) {
                const response = await fetch("http://localhost:8000/users/current/", {
                    headers: {
                        "Authorization": `Token ${token}`
                    }
                });
                setUser(await response.json());
            }
            else {
                setUser(null);
                if (!(await getFingerPrintChrome())) {
                    const client = new ClientJS();
                    setFingerPrintChrome(client.getFingerprint())
                }
                setFingerprint(await getFingerPrintChrome())
            }
        }

        currentUser();
    }, [user]);

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
                        onClick={() => navigate("/tracking-page")}>
                        Tracking Page
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/settings")}>
                        Settings
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
        <>
            {`Guest User ${fingerprint}`}

            <Stack direction="column" spacing={2}>
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

                <Button
                    variant="contained"
                    onClick={() => navigate("/tracking-page")}>
                    Tracking Page
                </Button>

                {
                    // Icon on Button https://stackoverflow.com/questions/66095141/how-to-put-an-icon-on-in-the-corner-of-a-material-ui-button
                }
                <Button
                    variant="outlined"
                    color="success"
                    startIcon={<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU" alt="google Icon" width="24" height="24" />}
                    onClick={() => googleSignIn(setUser)}>
                    Sign In with Google
                </Button>
            </Stack>
        </>
    );
}