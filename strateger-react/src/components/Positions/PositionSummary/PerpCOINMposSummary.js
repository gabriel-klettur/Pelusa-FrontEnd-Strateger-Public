// Path: strateger-react/src/components/Account/PositionSummary/PerpCOINMposSummary.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPositionsCoinM } from '../../../slices/positionSlice';

const PerpCOINMposSummary = () => {
  const dispatch = useDispatch();
  const { positions = [], loading, error } = useSelector((state) => state.positions.coinM) || {};

  useEffect(() => {
    dispatch(fetchPositionsCoinM());
  }, [dispatch]);

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
      <h3 className="text-xl font-bold mb-2">Perp COIN-M Positions</h3>
      <div className="grid grid-cols-1 gap-4">
        {positions.map((position) => (
          <div key={position.positionId} className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-bold">{position.symbol}</h4>
            <p>Position ID: {position.positionId}</p>
            <p>Position Side: {position.positionSide}</p>
            <p>Isolated: {position.isolated ? 'Yes' : 'No'}</p>
            <p>Position Amount: {position.positionAmt}</p>
            <p>Available Amount: {position.availableAmt}</p>
            <p>Unrealized Profit: {position.unrealizedProfit}</p>
            <p>Initial Margin: {position.initialMargin}</p>
            <p>Liquidation Price: {position.liquidationPrice}</p>
            <p>Average Price: {position.avgPrice}</p>
            <p>Leverage: {position.leverage}</p>
            <p>Mark Price: {position.markPrice}</p>
            <p>Risk Rate: {position.riskRate}</p>
            <p>Max Margin Reduction: {position.maxMarginReduction}</p>
            <p>Update Time: {new Date(position.updateTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerpCOINMposSummary;
