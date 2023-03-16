declare module 'canvasjs-react-charts' {
    import * as React from 'react';
    import * as CanvasJS from 'canvasjs';
  
    export interface ICanvasJSChartProps {
      options?: CanvasJS.ChartOptions;
      containerProps?: React.HTMLAttributes<HTMLDivElement>;
      onRef?: (ref: CanvasJS.Chart) => void;
    }
  
    export class CanvasJSChart extends React.Component<ICanvasJSChartProps, any> {}
  }