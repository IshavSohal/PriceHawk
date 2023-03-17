import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getToken } from "../utilities/session";

type Props = {
  id: number;
  name: string;
  price: number;
};

export default function TrackingPageRow(props: Props) {
  const [deleted, setDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [price, setPrice] = useState(props.price);
  const navigate = useNavigate();

  async function handleRefresh() {
    setRefreshing(true);

    const res = await fetch(
      `http://localhost:8000/items/${props.id}/refresh/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${await getToken()}`,
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      setPrice(await data["price"]);
    }
    setRefreshing(false);
  }

  async function handleDelete() {
    await fetch(`http://localhost:8000/items/delete-item/${props.id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${await getToken()}`,
      },
    });
    setDeleted(true);
  }

  if (deleted) {
    return <></>;
  }

  return (
    <TableRow
      key={props.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {props.name}
      </TableCell>
      <TableCell align="left">
        {price} {refreshing && <CircularProgress />}
      </TableCell>
      <TableCell align="left">
        {
          <Button onClick={() => navigate(`/items/${props.id}`)}>
            page/items/{props.id}
          </Button>
        }
      </TableCell>

      <Button onClick={handleRefresh}>Refresh</Button>
      <Button onClick={() => setOpen(true)}>Delete</Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you permanently want to delete this item from the tracking page?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
