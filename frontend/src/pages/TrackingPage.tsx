import React, { useState, useEffect } from 'react';
import { Button, Divider, Stack } from "@mui/material";
import  { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import BasicTable from "./BasicTable";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getToken } from '../utilities/session';

const TrackingPage = () => {
  const [dataNew, setDataNew] = useState<any[]>([]);
  useEffect(() => {
    // axios.get("http://localhost:8000/items/get-items/").then((data) => setDataNew(data.data))
    async function getData() {
      const response = await fetch("http://localhost:8000/items/get-items/", {
        headers: {
          "Authorization": `Token ${await getToken()}`
        }
      });
      setDataNew(await response.json());
    }
    getData();
  }, []);
  // axios.delete(`http://localhost:8000/items/delete-item/${dataNew}/`)

  function handleDelete(id: any) {
    async function deleteItem() {
      await fetch(`http://localhost:8000/items/delete-item/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Token ${await getToken()}`
        }
      });
    }
    deleteItem();
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Item</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            {/* <TableCell align="right">Created</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataNew.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              {/* <TableCell align="right">{row.created}</TableCell> */}
              <Button onClick ={() => handleDelete(row.id)}>Delete</Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
    
  )
}

export default TrackingPage;
