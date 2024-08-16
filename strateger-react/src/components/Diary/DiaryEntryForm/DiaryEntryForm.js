// Path: strateger-react/src/components/Diary/DiaryEntryForm/DiaryEntryForm.js

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages } from '../../../redux/slices/diarySlice';
import DateForm from '../../DateForm'
import TextForm from './TextForm';
import PhotosForm from './PhotosForm';
import ReferencesForm from './ReferencesForm/ReferencesForm';

import Ventanita from '../../common/Ventanita';

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
  const [currentPage, setCurrentPage] = useState(1); 
  const [selectedIds, setSelectedIds] = useState([]); 
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders) || []; 
  const alarms = useSelector((state) => state.alarms.alarms) || []; 
  const strategies = useSelector((state) => state.strategies.items) || []; 
  const diaryEntries = useSelector((state) => state.diary.items) || []; 

  const itemsPerPage = 10; 

  useEffect(() => {
    if (entry) {
      setFormData(entry);
      setSelectedIds(entry.references);
    } else {
      setFormData(initialState);
      setSelectedIds([]);
    }
  }, [entry]);

  useEffect(() => {
    setCurrentPage(1); 
  }, [setCurrentPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, photos: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.text.trim()) {
      setErrors({ text: 'El texto no puede estar vacío.' });
      return;
    }

    try {
      const photoUrls = await dispatch(uploadImages(formData.photos)).unwrap();
      const formDataToSubmit = {
        ...formData,
        photos: photoUrls,
        references: selectedIds
      };
      const isUpdate = !!formData.id;
      if (!isUpdate) {
        onSave({ ...formDataToSubmit, id: null });
      } else {
        onSave(formDataToSubmit);
      }
      setFormData(initialState);
      fileInputRef.current.value = null;
      setSelectedIds([]);
      setErrors({}); 
    } catch (error) {
      console.error("Error uploading images:", error);
      setErrors({ global: 'Failed to upload images. Please try again.' });
    }
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
    const references = selectedIds.includes(reference)
      ? selectedIds.filter(ref => ref !== reference)
      : [...selectedIds, reference];
    setSelectedIds(references);
  };

  const handleAddId = (id) => {
    setSelectedIds((prev) => [...prev, id]);
  };

  const isSelected = (type, id) => {
    return selectedIds.includes(`${type}-${id}`);
  };

  return (
    <div className="col-span-10">
      <Ventanita 
        titulo={
          <div>
            {entry ? 'Editing Entry' : 'Add New Entry'}
          </div>
        }
        contenido={
          <form onSubmit={handleSubmit} className="">               
            
            {errors.global && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                {errors.global}
              </div>
            )}
            
            <Ventanita 
              titulo="Date / Time"
              contenido={
                <DateForm 
                  date={formData.date} 
                  handleChange={handleChange} 
                  name="date"             
                />
              }
            />
            
            <Ventanita
              titulo="Comment"
              contenido={
                <TextForm
                  text={formData.text}
                  handleChange={handleChange}
                  error={errors.text}
                />
              }
            />            
            
            <Ventanita
              titulo='Photos'
              contenido={
                <PhotosForm
                  photos={formData.photos}
                  handlePhotoChange={handlePhotoChange}
                  fileInputRef={fileInputRef}
                />
              }
            />
            
            <Ventanita
              titulo="References"

              contenido={
                <ReferencesForm
                  alarms={alarms}
                  orders={orders}
                  strategies={strategies}
                  diaryEntries={diaryEntries}
                  handleSelectReference={handleSelectReference}
                  handleAddId={handleAddId}
                  isSelected={isSelected}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage={setCurrentPage}
                  selectedIds={selectedIds}
                />
              }
            />
            
            <div className="flex justify-between">
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
                className="bg-african_violet-400 hover:bg-african_violet-300 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
                onClick={handleClear}
              >
                Clear Entry
              </button>
            </div>

          </form>
        } 
      />              
    </div>
  );
};

export default DiaryEntryForm;
