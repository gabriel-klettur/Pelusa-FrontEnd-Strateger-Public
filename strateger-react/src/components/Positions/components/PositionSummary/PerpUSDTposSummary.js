// Path: strateger-react/src/components/Account/PositionSummary/PerpUSDTposSummary.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPositionsUSDTM } from '../../../../redux/position';

const PerpUSDTposSummary = () => {
  const dispatch = useDispatch();
  const { positions = [], loading, error, loaded } = useSelector((state) => state.positions.usdtM) || {};

  useEffect(() => {
    if (!loaded)
      dispatch(fetchPositionsUSDTM());
  }, [dispatch, loaded]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (positions.length === 0) {
    return <div>No positions available</div>;
  }

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Perp USDT-M Positions</h3>
      <div className="grid grid-cols-1 gap-4">
        {positions.map((position) => (
          <div key={position.positionId} className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-bold">{position.symbol}</h4>
            <p>Position ID: {position.positionId}</p>
            <p>Currency: {position.currency}</p>
            <p>Position Amount: {position.positionAmt}</p>
            <p>Available Amount: {position.availableAmt}</p>
            <p>Position Side: {position.positionSide}</p>
            <p>Isolated: {position.isolated ? 'Yes' : 'No'}</p>
            <p>Average Price: {position.avgPrice}</p>
            <p>Initial Margin: {position.initialMargin}</p>
            <p>Margin: {position.margin}</p>
            <p>Leverage: {position.leverage}</p>
            <p>Unrealized Profit: {position.unrealizedProfit}</p>
            <p>Realized Profit: {position.realisedProfit}</p>
            <p>Liquidation Price: {position.liquidationPrice}</p>
            <p>PnL Ratio: {position.pnlRatio}</p>
            <p>Max Margin Reduction: {position.maxMarginReduction}</p>
            <p>Risk Rate: {position.riskRate}</p>
            <p>Mark Price: {position.markPrice}</p>
            <p>Position Value: {position.positionValue}</p>
            <p>Only One Position: {position.onlyOnePosition ? 'Yes' : 'No'}</p>
            <p>Update Time: {new Date(position.updateTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerpUSDTposSummary;
