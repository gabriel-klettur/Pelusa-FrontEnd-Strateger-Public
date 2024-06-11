// Path: strateger-react/src/components/Strategy/StrategyItem.js

import React from 'react';

const StrategyItem = ({ strategy, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 border border-gray-300">
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-2 border border-gray-300 p-4">
          <h2 className="text-lg font-bold">{strategy.name}</h2>
          <p><strong>ON/OFF: </strong> {strategy.isOn ? 'ON' : 'OFF'}</p>
          <p><strong>API KEY:</strong> {strategy.apiKey}</p>
          <p><strong>SECRET KEY:</strong> {strategy.secretKey}</p>
          <p><strong>Ticker:</strong> {strategy.ticker}</p>
          <p><strong>Resultado Acc:</strong> {strategy.resultadoAcc}</p>
          <p><strong>Descripción:</strong> {strategy.description}</p>
        </div>

        <div className="col-span-4 grid grid-cols-4 gap-4 border border-gray-300 p-4">
          <div className="col-span-2">
            <p><strong>Long Entry Order:</strong> {strategy.longEntryOrder}</p>
            <p><strong>Long Close Order:</strong> {strategy.longCloseOrder}</p>
            <p><strong>Long Entry Indicator:</strong> {strategy.longEntryIndicator}</p>
            <p><strong>Long Close Indicator:</strong> {strategy.longCloseIndicator}</p>
            <p><strong>Long Pyramiding:</strong> {strategy.longPyramiding}</p>
            <p><strong>Long Leverage:</strong> {strategy.longLeverage}</p>
            <p><strong>Long Quantity:</strong> {strategy.longQuantity}</p>
          </div>
          <div className="col-span-2">
            <p><strong>TP per Order:</strong> {strategy.longTPPerOrder}</p>
            <p><strong>TP General:</strong> {strategy.longTPGeneral}</p>
          </div>
        </div>

        <div className="col-span-4 grid grid-cols-4 gap-4 border border-gray-300 p-4">
          <div className="col-span-2">
            <p><strong>Short Entry Order:</strong> {strategy.shortEntryOrder}</p>
            <p><strong>Short Close Order:</strong> {strategy.shortCloseOrder}</p>
            <p><strong>Short Entry Indicator:</strong> {strategy.shortEntryIndicator}</p>
            <p><strong>Short Close Indicator:</strong> {strategy.shortCloseIndicator}</p>
            <p><strong>Short Pyramiding:</strong> {strategy.shortPyramiding}</p>
            <p><strong>Short Leverage:</strong> {strategy.shortLeverage}</p>
            <p><strong>Short Quantity:</strong> {strategy.shortQuantity}</p>
          </div>
          <div className="col-span-2">
            <p><strong>SL per Order:</strong> {strategy.shortSLPerOrder}</p>
            <p><strong>SL General:</strong> {strategy.shortSLGeneral}</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onEdit(strategy.id)}
        >
          Editar
        </button>
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => onDelete(strategy.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default StrategyItem;
