import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/system';
import LineChart from '../../components/LineChart';
import { useParams } from 'react-router-dom';

export default function ItemPricesPage() {
  
  const { id } = useParams();
  const [itemId, setItemId] = useState(-1);

  useEffect(() => {
    if (id) {
      setItemId(parseInt(id, 10));
    }
  }, []);
  
  return (
    <>
      <LineChart item_id={itemId}/>
    </>
  )
}