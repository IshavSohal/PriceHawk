import { useState, useEffect } from 'react';
import LineChart from '../../components/LineChart';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNavigate } from "react-router";

export default function ItemPricesPage() {

    const { id } = useParams();
    const [itemId, setItemId] = useState(-1);
    const navigate = useNavigate();
    
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