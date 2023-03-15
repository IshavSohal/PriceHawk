import { useState, useEffect } from 'react';
import LineChart from '../../components/LineChart';
import { useParams } from 'react-router-dom';

export default function ItemPricesPage() {
  
  const { id } = useParams();
  const [itemId, setItemId] = useState(-1);

  useEffect(() => {
    if (id) {
      setItemId(parseInt(id, 10));
    }
  }, [id]);
  
  return (
    <>
      <LineChart item_id={itemId}/>
    </>
  )
}