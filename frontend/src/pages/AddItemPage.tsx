import React, { useState } from 'react';
import { Button, TextField, Grid } from "@mui/material";
import { useNavigate } from 'react-router';
import { Stack } from '@mui/system';
import { getFingerPrintChrome, getToken } from '../utilities/session';

interface itemForm {
    [index: string]: string | number,
}

/**
 * Page for the user to manually add items to track
 */
export default function AddItemPage() {

    const navigate = useNavigate();

    const [values, setValues] = useState<itemForm>({
        name: '',
        price: '',
        url: ''
    });

    const API = "http://127.0.0.1:8000"

    /**
     * Send POST request with name, price, url
     */
    async function sendRequest() {

        const fetchOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.name,
                price: values.price,
                url: values.url,
                guestid: await getFingerPrintChrome()
            })
        };

        const authToken = await getToken();

        if (authToken) {
            fetchOptions.headers = {
                'Content-Type': 'application/json',
                Authorization: `Token ${authToken}`
            };
        }

        fetch(`${API}/items/create/`, fetchOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                return Promise.reject(response);
            })
            .then(function (data) { // on success
                navigate("/");
            }).catch((response) => { // on failure
                response.json().then((json: any) => {
                    let v_url = json["url"] || " "
                    let v_price = json["price"] || ""
                    alert("Invalid Request: " + v_url + v_price);
                })
            });

    }

    return (
        <>
            <Stack style={{ width: "400px" }} spacing={2}>
                <TextField id="outlined-multiline" label='Item Name' onChange={(e) => {
                    setValues(prevValues => ({ ...prevValues, name: e.target.value }))
                }} />
                <TextField id="outlined-multiline" type="number" label='Item Price' onChange={(e) => {
                    setValues(prevValues => ({ ...prevValues, price: e.target.value }))
                }} />
                <TextField id="outlined-multiline" label='Item URL' onChange={(e) => {
                    setValues(prevValues => ({ ...prevValues, url: e.target.value }))
                }} />

                <Grid container spacing={2}>
                    <Button variant="contained" onClick={sendRequest}>
                        Add
                    </Button>

                    <Button variant="contained" style={{marginLeft: "1%"}} onClick={() => navigate(-1)}>
                        Cancel 
                    </Button>
                </Grid>

            </Stack>

        </>
    )
}