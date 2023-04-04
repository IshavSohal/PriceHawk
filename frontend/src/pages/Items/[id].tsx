import { useState, useEffect } from 'react';
import LineChart from '../../components/LineChart';
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';

export default function ItemPricesPage() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [itemId, setItemId] = useState(-1);
    
    useEffect(() => {
        if (id) {
            setItemId(parseInt(id, 10));
        }
    }, [id]);

    return (
        <>
            <LineChart item_id={itemId} />

            <br/>
            <br/>
            <Button onClick={() => navigate(-1)}>
                Back
            </Button>
            <br/>
            <br/>

        </>
    )
}