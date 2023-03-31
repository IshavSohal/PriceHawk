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

const TrackingPage = () => {
    const [dataNew, setDataNew] = useState([]);
    const [data, setData] = useState([])

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
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150, maxWidth:180 }} aria-label="simple table">
                {dataNew.map((row) => (
                    <Accordion id={Object.keys(row)[0]}>
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row[Object.keys(row)[0]].map((row2) => (
                                    <TrackingPageRow key={row2.id} {...row2} />
                                ))}
                            </TableBody>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Table>
        </TableContainer>)
};

export default TrackingPage;
