import { CanvasJSChart } from 'canvasjs-react-charts';
import { useEffect, useState } from 'react';
import { getToken } from '../utilities/session';

interface Price {
  id: number;
  item: number;
  itemname: string;
  value: number;
  date: string;
}

interface DataPoint {
  x: number;
  y: number;
}


const LineChart = ({ item_id }: { item_id: number}) => {
    const API = "http://127.0.0.1:8000"

    const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
    const [itemName, setItemName] = useState("");
  
    const options = {
      animationEnabled: true,
      theme: "light2",
      height: 250,
      width: 400,
      title: {
        text: `${itemName}'s Price History`
      },
      axisX: {
        minimum: Math.min(...dataPoints.map(dataPoint => dataPoint.x))
      },
      data: [{
        type: "line",
        dataPoints: dataPoints
      }]
    };

    useEffect(() => {

        async function getPrices(id: number) {
          // `https://mocki.io/v1/5f67f9ed-fd80-4e4d-8e93-690afcbedcc3`
          // `https://mocki.io/v1/f51ce6f8-10a5-4416-8956-188663a29932`
            const response = await fetch(`${API}/items/prices/${id}/`, {
                headers: {
                    "Authorization": `Token ${await getToken()}`
                }
            });

            if (response.ok) {
              const data = await response.json();
              const points = data.map((item: Price) => ({
                x: new Date(item.date),
                y: item.value
              }));
              setDataPoints(points);
              setItemName(data.length > 0 ? data[0].itemname : null)
            }
        }

        getPrices(item_id);

    }, [item_id]);
  
    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
  
  export default LineChart;