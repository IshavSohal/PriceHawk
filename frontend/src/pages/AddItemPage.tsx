import React, { useState, useEffect } from 'react';
import { ClientJS } from 'clientjs';
import { Button, TextField } from "@mui/material";
import { useNavigate } from 'react-router';
import { Stack } from '@mui/system';

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

  const [fingerprint, setFingerprint] = useState<string>('');

  const API = "http://127.0.0.1:8000"

  /**
   * Load Browsers Unique Fingerprint
   * Helps identify guest user.
   */
  useEffect(() => {
    const client = new ClientJS();
    setFingerprint(client.getFingerprint());
  }, []);
  
  /**
   * Send POST request with name, price, url
   */
  function sendRequest() {
    
    fetch( `${API}/items/create/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        price: values.price,
        url: values.url,
        guestid: fingerprint
      })
    })
    .then((response) => { 
      if (response.ok) {
        return response.json()
      } 
      return Promise.reject(response);
    })
    .then(function (data) { // on success
      navigate("/");
    }).catch((error) => alert("Error Adding Item: " + error.statusText)); // on error

  }

    return (
        <>

        <Stack style={{width: "400px", height: "250px"}} spacing={2}>
          <TextField id="outlined-multiline" label='Item Name' onChange={(e) => {
            setValues(prevValues => ({...prevValues, name: e.target.value}))
          }}/>
          <TextField id="outlined-multiline" type="number" label='Item Price' onChange={(e) => {
            setValues(prevValues => ({...prevValues, price: e.target.value}))
          }}/>
          <TextField id="outlined-multiline" label='Item URL' onChange={(e) => {
            setValues(prevValues => ({...prevValues, url: e.target.value}))
          }}/>

          <Button variant="contained" onClick={sendRequest}>
            Add
          </Button>

        </Stack>

        </>
      )
}