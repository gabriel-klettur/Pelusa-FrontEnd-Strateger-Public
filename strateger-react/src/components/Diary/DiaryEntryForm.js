import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import Slider from "react-slick";

const DiaryEntryForm = ({ onSave }) => {
  const currentDate = new Date().toISOString().slice(0, 16); // Obtener la fecha y hora actual en formato ISO y cortar a "YYYY-MM-DDTHH:MM"
  
  const initialState = {
    id: '',
    date: currentDate,
    text: '',
    photos: [],
    references: [],
  };

  const [formData, setFormData] = useState(initialState);
  const fileInputRef = useRef(null);

  const orders = useSelector((state) => state.orders.orders);
  const alarms = useSelector((state) => state.alarms.alarms);
  const strategies = useSelector((state) => state.strategies.items);
  const diaryEntries = useSelector((state) => state.diary.entries);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, photos: fileUrls });
    // Store the actual files separately if needed for form submission
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id) {
      formData.id = Date.now();
    }
    onSave(formData);
    setFormData(initialState);
    fileInputRef.current.value = null; // Reset the file input
  };

  const handleClear = () => {
    setFormData(initialState);
    fileInputRef.current.value = null; // Reset the file input
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (    
    <div className="col-span-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200">
        <h3 className="text-xl font-bold mb-6">Add New Entry</h3>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Date</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Photos</label>
          {formData.photos.length > 0 && (
            <Slider {...sliderSettings} className="mb-4">
              {formData.photos.map((photoUrl, index) => (
                <div key={index} className="flex justify-center items-center">
                  <img
                    src={photoUrl}
                    alt={`Attachment ${index + 1}`}
                    className="h-48 w-auto object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </Slider>
          )}
          <input
            type="file"
            name="photos"
            multiple
            onChange={handlePhotoChange}
            ref={fileInputRef}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">References</label>
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
              <Tab
                className={({ selected }) =>
                  `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg ${
                    selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  }`
                }
              >
                Orders
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg ${
                    selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  }`
                }
              >
                Alarms
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg ${
                    selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  }`
                }
              >
                Strategies
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg ${
                    selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  }`
                }
              >
                Diary
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel className="bg-white rounded-xl p-3">
                <select
                  name="references"
                  multiple
                  value={formData.references}
                  onChange={(e) =>
                    setFormData({ ...formData, references: [...e.target.selectedOptions].map((o) => o.value) })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                >
                  {orders.map((order) => (
                    <option key={order.orderId} value={`order-${order.orderId}`}>
                      {order.id} - {order.symbol} - {order.side}
                    </option>
                  ))}
                </select>
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-xl p-3">
                <select
                  name="references"
                  multiple
                  value={formData.references}
                  onChange={(e) =>
                    setFormData({ ...formData, references: [...e.target.selectedOptions].map((o) => o.value) })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                >
                  {alarms.map((alarm) => (
                    <option key={alarm.id} value={`alarm-${alarm.id}`}>
                      {alarm.id} - {alarm.Ticker} - {alarm.Order}
                    </option>
                  ))}
                </select>
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-xl p-3">
                <select
                  name="references"
                  multiple
                  value={formData.references}
                  onChange={(e) =>
                    setFormData({ ...formData, references: [...e.target.selectedOptions].map((o) => o.value) })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                >
                  {strategies.map((strategy) => (
                    <option key={strategy.id} value={`strategy-${strategy.id}`}>
                      {strategy.name}
                    </option>
                  ))}
                </select>
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-xl p-3">
                <select
                  name="references"
                  multiple
                  value={formData.references}
                  onChange={(e) =>
                    setFormData({ ...formData, references: [...e.target.selectedOptions].map((o) => o.value) })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
                >
                  {diaryEntries.map((entry) => (
                    <option key={entry.id} value={`diary-${entry.id}`}>
                      {new Date(entry.date).toLocaleString()} - {entry.text.substring(0, 20)}
                    </option>
                  ))}
                </select>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
          >
            Save Entry
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
            onClick={handleClear}
          >
            Clear Entry
          </button>
        </div>
      </form>
    </div>    
  );
};

export default DiaryEntryForm;
