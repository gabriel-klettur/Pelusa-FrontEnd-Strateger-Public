// Path: strateger-react/src/components/Diary/DiaryEntry.js

import React from 'react';
import { useSelector } from 'react-redux';

const DiaryEntry = ({ entry, onEdit, onDelete }) => {
  const orders = useSelector((state) => state.orders.orders);
  const alarms = useSelector((state) => state.alarms.alarms);
  const strategies = useSelector((state) => state.strategies.items);
  const diaryEntries = useSelector((state) => state.diary.entries);

  const getReferenceDescription = (ref) => {
    const [type, id] = ref.split('-');
    switch (type) {
      case 'order':
        const order = orders.find((order) => order.orderId === parseInt(id, 10));
        return order ? `Order: ${order.symbol} - ${order.side}` : 'Order not found';
      case 'alarm':
        const alarm = alarms.find((alarm) => alarm.id === parseInt(id, 10));
        return alarm ? `Alarm: ${alarm.Ticker} - ${alarm.Order}` : 'Alarm not found';
      case 'strategy':
        const strategy = strategies.find((strategy) => strategy.id === parseInt(id, 10));
        return strategy ? `Strategy: ${strategy.name}` : 'Strategy not found';
      case 'diary':
        const diaryEntry = diaryEntries.find((entry) => entry.id === parseInt(id, 10));
        return diaryEntry ? `Diary Entry: ${new Date(diaryEntry.date).toLocaleString()} - ${diaryEntry.text.substring(0, 20)}` : 'Diary entry not found';
      default:
        return 'Unknown reference';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="mb-2">
        <strong>Date:</strong> {new Date(entry.date).toLocaleString()}
      </div>
      <div className="mb-2">
        <strong>Text:</strong> {entry.text}
      </div>
      <div className="mb-2">
        <strong>Photos:</strong>
        {entry.photos && entry.photos.length > 0 ? (
          <div className="flex flex-wrap">
            {entry.photos.map((photo, index) => (
              <img
                key={index}
                src={URL.createObjectURL(photo)}
                alt={`Attachment ${index + 1}`}
                className="h-24 w-24 object-cover m-1"
              />
            ))}
          </div>
        ) : (
          <span>No photos</span>
        )}
      </div>
      <div className="mb-2">
        <strong>References:</strong>
        <ul>
          {entry.references.map((ref, index) => (
            <li key={index}>{getReferenceDescription(ref)}</li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => onEdit(entry.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => onDelete(entry.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DiaryEntry;
