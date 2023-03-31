import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Divider, Stack } from "@mui/material";
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

type Item = {
    id: number;
    name: string;
    price: number;
    price_html: string;
};

const TrackingPage = () => {
    const [dataNew, setDataNew] = useState([] as Item[]);
    const navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            const token = await getToken()
            let response
            if (token)
                response = await fetch("http://localhost:8000/items/get-items/", {
                    headers: {
                        Authorization: `Token ${await getToken()}`,
                    },
                });
            else
                response = await fetch(`http://localhost:8000/items/get-guest-items/${await getFingerPrintChrome()}/`);

            setDataNew(await response.json());
        }
        getData();
    }, []);

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Refresh</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataNew.map((row) => (
                        <TrackingPageRow key={row.id} {...row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Button style={{position: 'absolute', bottom: '16px'}} onClick={() => navigate("/")}>Back</Button>
        </>
    );
};

export default TrackingPage;
