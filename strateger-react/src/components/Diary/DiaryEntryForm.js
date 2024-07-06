import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import Slider from "react-slick";
import AlarmItem from './AlarmItem';
import OrderItem from './OrderItem';
import StrategyItem from './StrategyItem';
import DiaryItem from './DiaryItem';

const currentDate = new Date().toISOString().slice(0, 16);

const initialState = {
  id: '',
  date: currentDate,
  text: '',
  photos: [],
  references: [],
};

const DiaryEntryForm = ({ onSave, entry, onCancelEdit }) => {
  const [formData, setFormData] = useState(initialState);
  const fileInputRef = useRef(null);

  const orders = useSelector((state) => state.orders.orders);
  const alarms = useSelector((state) => state.alarms.alarms);
  const strategies = useSelector((state) => state.strategies.items);
  const diaryEntries = useSelector((state) => state.diary.entries);

  useEffect(() => {
    if (entry) {
      setFormData(entry);
    } else {
      setFormData(initialState);
    }
  }, [entry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, photos: fileUrls });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData(initialState);
    fileInputRef.current.value = null;
  };

  const handleClear = () => {
    setFormData(initialState);
    fileInputRef.current.value = null;
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleSelectReference = (type, id) => {
    const reference = `${type}-${id}`;
    const references = formData.references.includes(reference)
      ? formData.references.filter(ref => ref !== reference)
      : [...formData.references, reference];
    setFormData({ ...formData, references });
  };

  const isSelected = (type, id) => {
    return formData.references.includes(`${type}-${id}`);
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
        <h3 className="text-xl font-bold mb-6">
          {entry ? 'Editing Entry' : 'Add New Entry'}
        </h3>
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
              {['Orders', 'Alarms', 'Strategies', 'Diary'].map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg ${
                      selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    }`
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel className="bg-white rounded-xl p-3">
                {alarms.map(alarm => (
                  <AlarmItem
                    key={alarm.id}
                    alarm={alarm}
                    onSelect={() => handleSelectReference('alarm', alarm.id)}
                    isSelected={isSelected('alarm', alarm.id)}
                  />
                ))}
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-xl p-3">
                {orders.map(order => (
                  <OrderItem
                    key={order.orderId}
                    order={order}
                    onSelect={() => handleSelectReference('order', order.orderId)}
                    isSelected={isSelected('order', order.orderId)}
                  />
                ))}
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-xl p-3">
                {strategies.map(strategy => (
                  <StrategyItem
                    key={strategy.id}
                    strategy={strategy}
                    onSelect={() => handleSelectReference('strategy', strategy.id)}
                    isSelected={isSelected('strategy', strategy.id)}
                  />
                ))}
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-xl p-3">
                {diaryEntries.map(diary => (
                  <DiaryItem
                    key={diary.id}
                    diary={diary}
                    onSelect={() => handleSelectReference('diary', diary.id)}
                    isSelected={isSelected('diary', diary.id)}
                  />
                ))}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className={`font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 ${
              entry ? 'bg-orange-500 hover:bg-orange-700 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
          >
            {entry ? 'Modify Entry' : 'Save Entry'}
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
