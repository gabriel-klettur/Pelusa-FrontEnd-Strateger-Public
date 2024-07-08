//Path: strateger-react/src/components/Diary/DiaryEntryForm.js

import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import Slider from "react-slick";
import AlarmItem from './AlarmItem';
import OrderItem from './OrderItem';
import StrategyItem from './StrategyItem';
import DiaryItem from './DiaryItem';
import { v4 as uuidv4 } from 'uuid'; // Importamos uuid para generar IDs únicos

const currentDate = new Date().toISOString().slice(0, 16);

const initialState = {
  id: '', // No asignar ID aquí, se hará al guardar
  date: currentDate,
  text: '',
  photos: [],
  references: [],
};

const DiaryEntryForm = ({ onSave, entry, onCancelEdit }) => {
  const [formData, setFormData] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1); // Estado para manejar la página actual
  const [activeTab, setActiveTab] = useState(0); // Estado para manejar la pestaña activa
  const [selectedIds, setSelectedIds] = useState([]); // Estado para manejar los IDs seleccionados
  const fileInputRef = useRef(null);

  const orders = useSelector((state) => state.orders.orders);
  const alarms = useSelector((state) => state.alarms.alarms);
  const strategies = useSelector((state) => state.strategies.items);
  const diaryEntries = useSelector((state) => state.diary.entries);

  const itemsPerPage = 10; // Número de elementos por página

  useEffect(() => {
    if (entry) {
      setFormData(entry);
    } else {
      setFormData(initialState);
    }
  }, [entry]);

  useEffect(() => {
    setCurrentPage(1); // Resetear la página actual al cambiar de pestaña
  }, [activeTab]);

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
    onSave({  ...formData, references: selectedIds, id: formData.id || uuidv4() }); // Asignar un ID único si no tiene uno
    setFormData(initialState);
    fileInputRef.current.value = null;
    //setSelectedIds([]); // Limpiar selectedIds después de guardar
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

  const handleAddId = (id) => {
    setSelectedIds((prev) => [...prev, id]);
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

  const getCurrentItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderPagination = (items) => {
    const totalPages = Math.ceil(items.length / itemsPerPage);

    return (
      <div className="flex justify-center space-x-2 mt-4">
        <button
          type="button"
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button
          type="button"
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
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
          <Tab.Group onChange={(index) => setActiveTab(index)}>
            <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
              {['Alarms', 'Orders', 'Strategies', 'Diary'].map((tab, index) => (
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
                {getCurrentItems(alarms).map(alarm => (
                  <AlarmItem
                    key={`alarm-${alarm.id}`}
                    alarm={alarm}
                    onSelect={() => handleSelectReference('alarm', alarm.id)}
                    isSelected={isSelected('alarm', alarm.id)}
                    onAdd={handleAddId}
                  />
                ))}
                {renderPagination(alarms)}
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-xl p-3">
                {getCurrentItems(orders).map(order => (
                  <OrderItem
                    key={`order-${order.orderId}`}
                    order={order}
                    onSelect={() => handleSelectReference('order', order.orderId)}
                    isSelected={isSelected('order', order.orderId)}
                    onAdd={handleAddId}
                  />
                ))}
                {renderPagination(orders)}
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-xl p-3">
                {getCurrentItems(strategies).map(strategy => (
                  <StrategyItem
                    key={`strategy-${strategy.id}`}
                    strategy={strategy}
                    onSelect={() => handleSelectReference('strategy', strategy.id)}
                    isSelected={isSelected('strategy', strategy.id)}
                    onAdd={handleAddId}
                  />
                ))}
                {renderPagination(strategies)}
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-xl p-3">
                {getCurrentItems(diaryEntries).map(diary => (
                  <DiaryItem
                    key={`diary-${diary.id}`}
                    diary={diary}
                    onSelect={() => handleSelectReference('diary', diary.id)}
                    isSelected={isSelected('diary', diary.id)}
                    onAdd={handleAddId}
                  />
                ))}
                {renderPagination(diaryEntries)}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        
        <div className="mt-4 mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Selected IDs</label>
          <input
            type="text"
            value={selectedIds.join(';')}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
          />
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
