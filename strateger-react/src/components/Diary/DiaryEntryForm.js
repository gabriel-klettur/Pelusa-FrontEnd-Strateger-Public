// Path: strateger-react/src/components/Diary/DiaryEntryForm.js

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const DiaryEntryForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    text: '',
    photos: [],
    references: [],
  });

  const orders = useSelector((state) => state.orders.orders);
  const alarms = useSelector((state) => state.alarms.alarms);
  const strategies = useSelector((state) => state.strategies.items);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id) {
      formData.id = Date.now();
    }
    onSave(formData);
    setFormData({ id: '', date: '', text: '', photos: [], references: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-bold mb-4">Add New Entry</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Text</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Photos</label>
        <input
          type="file"
          name="photos"
          multiple
          onChange={(e) => setFormData({ ...formData, photos: [...e.target.files] })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">References</label>
        <select
          name="references"
          multiple
          value={formData.references}
          onChange={(e) => setFormData({ ...formData, references: [...e.target.selectedOptions].map(o => o.value) })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <optgroup label="Orders">
            {orders.map((order) => (
              <option key={order.orderId} value={`order-${order.orderId}`}>
                {order.symbol} - {order.side}
              </option>
            ))}
          </optgroup>
          <optgroup label="Alarms">
            {alarms.map((alarm) => (
              <option key={alarm.id} value={`alarm-${alarm.id}`}>
                {alarm.Ticker} - {alarm.Order}
              </option>
            ))}
          </optgroup>
          <optgroup label="Strategies">
            {strategies.map((strategy) => (
              <option key={strategy.id} value={`strategy-${strategy.id}`}>
                {strategy.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Save Entry
      </button>
    </form>
  );
};

export default DiaryEntryForm;
