import React, { useState, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getFingerPrintChrome, getToken } from "../utilities/session";
import TrackingPageRow from "../components/TrackingPageRow";

// https://stackoverflow.com/questions/67543522/unsupported-media-type-text-plaincharset-utf-8-in-request-nextjs-api-error-w headers for guest request.
// https://stackoverflow.com/questions/38397894/get-json-key-name for getting object keys
// https://codesandbox.io/s/71u6bb?file=/demo.tsx for accordion usage

const TrackingPage = () => {
    const [dataNew, setDataNew] = useState([]);
    const [data, setData] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {

        async function getData() {
            const token = await getToken()
            let response
            if (token)
                response = await fetch("http://localhost:8000/items/get-items/", {
                    method: "POST",
                    headers: {
                        Authorization: `Token ${await getToken()}`,
                    },
                });
            else
                response = await fetch("http://localhost:8000/items/get-items/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 'guest_id': await getFingerPrintChrome() })
                });
            setDataNew(await response.json());
        }
        getData();
    }, [data]);    
    

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150, maxWidth: 180 }} aria-label="simple table">
                {(dataNew.length && dataNew.length !== 0) 
                    ?
                    dataNew.map((row) => (
                        <Accordion key={Object.keys(row)[0]}>
                            <AccordionSummary>
                                <Typography>
                                    {Object.keys(row)[0]}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Vendor</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Refresh</TableCell>
                                        <TableCell>Delete</TableCell>
                                        <TableCell>Link</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row[Object.keys(row)[0]].map((row2) => (
                                        <TrackingPageRow key={row2.id} id={row2.id} price_html={row2.price_html} vendor_name={row2.vendor_name} url={row2.url} price={row2.price} setDel={setData} del={data}/>
                                    ))}
                                </TableBody>
                            </AccordionDetails>
                        </Accordion>
                    ))
                    :
                    <></>}
            </Table>

            <br />
            <br />
            <Button onClick={() => navigate(-1)}>
                Back
            </Button>
            <br />
            <br />
        </TableContainer>)

};

export default TrackingPage;
