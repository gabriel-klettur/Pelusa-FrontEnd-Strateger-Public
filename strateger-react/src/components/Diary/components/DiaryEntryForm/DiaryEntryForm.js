// Path: strateger-react/src/components/Diary/DiaryEntryForm/DiaryEntryForm.js

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImages } from '../../../../redux/diary';
import DateForm from './DateForm'
import TextForm from './TextForm';
import PhotosForm from './PhotosForm';
import ReferencesForm from './ReferencesForm/ReferencesForm';

import Ventanita from '../../../common/Ventanita';
import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';

const currentDate = new Date().toISOString().slice(0, 16);

const initialState = {
  id: '', 
  date: currentDate,
  text: '',
  photos: [],
  references: [],
};

const DiaryEntryForm = ({ onSave, entry, onCancelEdit }) => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);   
  const [selectedIds, setSelectedIds] = useState([]);

  const [errors, setErrors] = useState({});                 

  
  const fileInputRef = useRef(null);                        

  // Hook to update the form data when the entry prop changes, 
  // if entry is not null then set the form data to the entry, otherwise set it to the initial state
  useEffect(() => {
    if (entry) {      
      setFormData(entry);
      setSelectedIds(entry.references);
    } else {
      setFormData(initialState);
      setSelectedIds([]);
    }
  }, [entry]);

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

  return (    
    <Ventanita 
      titulo={
        <div>
          {entry ? 'Editing Entry' : 'Add New Entry'}
        </div>
      }
      contenido={
        <form onSubmit={handleSubmit}>               
          
          {errors.global && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {errors.global}
            </div>
          )}
          
          <DateForm 
            date={formData.date} 
            handleChange={handleChange} 
            name="date"             
          />    

          <TextForm
            text={formData.text}
            handleChange={handleChange}
            error={errors.text}
          />    
          
          <PhotosForm
            photos={formData.photos}
            handlePhotoChange={handlePhotoChange}
            fileInputRef={fileInputRef}
            setFormData={setFormData}
          />           
          <ReferencesForm            
            setSelectedIds={setSelectedIds}              
            selectedIds={selectedIds}
          />
                      
          <div className="flex justify-between">
            <SubmitButton entry={entry} />
            <ClearButton handleClear={handleClear} />
          </div>

        </form>
      } 
    />              
  );
};

export default DiaryEntryForm;
