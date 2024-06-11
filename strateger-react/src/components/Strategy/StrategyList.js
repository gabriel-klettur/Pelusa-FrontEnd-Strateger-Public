// Path: strateger-react/src/components/Strategy/StrategyList.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StrategyItem from './StrategyItem';
import StrategyForm from './StrategyForm/StrategyForm';
import { addStrategy, updateStrategy, deleteStrategy } from '../../slices/strategySlice';

const StrategyList = () => {
  const dispatch = useDispatch();
  const strategies = useSelector((state) => state.strategies.items);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState(null);

  const handleAdd = () => {
    setCurrentStrategy(null);
    setIsEditing(true);
  };

  const handleEdit = (id) => {
    const strategy = strategies.find((s) => s.id === id);
    setCurrentStrategy(strategy);
    setIsEditing(true);
  };

  const handleSave = (strategy) => {
    if (currentStrategy) {
      dispatch(updateStrategy(strategy));
    } else {
      dispatch(addStrategy(strategy));
    }
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteStrategy(id));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const renderStrategies = (start, end) => (
    <>
      {strategies.slice(start, end).map((strategy) => (
        <StrategyItem 
          key={strategy.id}
          strategy={strategy}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </>
  );

  const renderEditingView = () => {
    const currentIndex = strategies.findIndex((s) => s.id === (currentStrategy ? currentStrategy.id : null));

    return (
      <>
        {currentIndex > 0 && <div className="mb-4">{renderStrategies(0, currentIndex)}</div>}
        <StrategyForm 
          strategy={currentStrategy}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        {currentIndex < strategies.length - 1 && <div className="mt-4">{renderStrategies(currentIndex + 1, strategies.length)}</div>}
      </>
    );
  };

  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded">
      {isEditing ? (
        renderEditingView()
      ) : (
        <div>
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={handleAdd}
          >
            Añadir Estrategia
          </button>
          {renderStrategies(0, strategies.length)}
        </div>
      )}
    </div>
  );
};

export default StrategyList;
