import React, { useEffect, useState } from 'react';
import ChartCanvasWrapper from './ChartCanvasWrapper';
import Toolbar from './Toolbar';
import { fetchData } from './fetchData';
import { withSize, withDeviceRatio } from 'react-financial-charts';

const CandleChart = ({ width, height, ratio }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interval, setInterval] = useState("1h");
  const [showElderRay, setShowElderRay] = useState(true);
  const [showBottomPanel, setShowBottomPanel] = useState(false);
  const [showVolume, setShowVolume] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData(interval, setData, setError, setLoading);
  }, [interval]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <Toolbar
        interval={interval}
        setInterval={setInterval}
        showElderRay={showElderRay}
        setShowElderRay={setShowElderRay}
        showBottomPanel={showBottomPanel}
        setShowBottomPanel={setShowBottomPanel}
        showVolume={showVolume}
        setShowVolume={setShowVolume}
      />
      <ChartCanvasWrapper
        data={data}
        width={width}
        height={height}
        ratio={ratio}
        showElderRay={showElderRay}
        showBottomPanel={showBottomPanel}
        showVolume={showVolume}
      />
    </div>
  );
};

export default withSize({ style: { minHeight: 300 } })(withDeviceRatio()(CandleChart));
