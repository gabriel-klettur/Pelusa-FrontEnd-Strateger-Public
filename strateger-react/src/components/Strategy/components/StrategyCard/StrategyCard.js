// Path: strateger-react/src/components/Strategy/StrategyCard/StrategyCard.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchStrategies, saveStrategy, removeStrategy } from '../../../../redux/strategy/strategySlice';

import StrategyItem from './StrategyItems';
import StrategyForm from '../forms/StrategyForm/StrategyForm';


const StrategyCard = () => {
  const dispatch = useDispatch();
  const strategies = useSelector((state) => state.strategies.items);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState(null);

  useEffect(() => {
    dispatch(fetchStrategies({ skip: 0, limit: 10 }));
  }, [dispatch]);

  const handleAdd = () => {
    setCurrentStrategy(null);
    setIsEditing(true);
  };

  const handleEdit = (id) => {
    const strategy = strategies.find((s) => s.id === id);
    setCurrentStrategy(strategy);
    setIsEditing(true);
  };

  const handleSave = async (strategy) => {
    try {
      await dispatch(saveStrategy(strategy));
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving strategy:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(removeStrategy(id));
    } catch (error) {
      console.error('Error deleting strategy:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-1 bg-african_violet-200 text-african_violet-900">
      {isEditing ? (
        <StrategyForm 
          strategy={currentStrategy}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div>
          <div className="flex justify-between items-center p-2">            
            <button 
              className="bg-green-500 hover:bg-african_violet-600 text-white font-bold py-2 px-4 rounded shadow transition-colors duration-200 w-48"
              onClick={handleAdd}
            >
              Añadir Estrategia
            </button>
          </div>
          <div className="grid gap-4">
            {strategies.map((strategy) => (
              <StrategyItem 
                key={strategy.id}
                strategy={strategy}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          {strategies.length === 0 && (
            <p className="text-center text-african_violet-600">No hay estrategias disponibles. ¡Añade una nueva!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StrategyCard;
