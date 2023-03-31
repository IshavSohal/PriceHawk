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
import { useState } from "react";
import { useNavigate } from "react-router";
import { getFingerPrintChrome, getToken } from "../utilities/session";

type Props = {
    id: number;
    name: string;
    price: number;
    price_html: string;
};

export default function TrackingPageRow(props: Props) {
    const [deleted, setDeleted] = useState(false);
    const [open, setOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [price, setPrice] = useState(props.price);
    const navigate = useNavigate();

    async function handleRefresh() {
        setRefreshing(true);
        const token = await getToken()
        let res

        if (token)
            res = await fetch(
                `http://localhost:8000/items/${props.id}/refresh/`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
        else
            res = await fetch(`http://localhost:8000/items/${props.id}/refresh-guest/${await getFingerPrintChrome()}/`, { method: "POST" });

        if (res.ok) {
            const data = await res.json();
            setPrice(await data["price"]);
        }
        setRefreshing(false);
    }

    async function handleDelete() {
        const token = await getToken()

        if (token) {
            await fetch(`http://localhost:8000/items/delete-item/${props.id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
        }
        else {
            await fetch(`http://localhost:8000/items/delete-guest-item/${await getFingerPrintChrome()}/${props.id}/`, { method: "DELETE" });
        }
        setDeleted(true);
    }

    if (deleted) {
        return <></>;
    }

    return (
        <TableRow
            key={props.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>

            <TableCell component="th" scope="row">
                {props.price_html 
                    ?
                    <Button onClick={() => navigate(`/items/${props.id}`)}>
                        {props.name}
                    </Button>
                    : 
                    <>{props.name}</>}
            </TableCell>

            <TableCell>
                {price} {refreshing && <CircularProgress size="15px" />}
            </TableCell>

            <TableCell>
                {props.price_html 
                    ?
                    <Button onClick={handleRefresh}>Refresh</Button>
                    : 
                    <>Not Refreshable</>}
            </TableCell>

            <TableCell>
                <Button onClick={() => setOpen(true)}>Delete</Button>
            </TableCell>

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
