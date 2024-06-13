import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StrategyItem from './StrategyItem';
import StrategyForm from './StrategyForm/StrategyForm';
import { fetchStrategies, saveStrategy, removeStrategy} from '../../slices/strategySlice';

const StrategyList = () => {
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
      console.log('Saving strategy:', strategy);
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
    <div className="container mx-auto p-4 border border-gray-300 rounded">
      {isEditing ? (
        <StrategyForm 
          strategy={currentStrategy}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div>
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={handleAdd}
          >
            Agregar Estrategia 
          </button>
          {strategies.map((strategy) => (
            <StrategyItem 
              key={strategy.id}
              strategy={strategy}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StrategyList;
