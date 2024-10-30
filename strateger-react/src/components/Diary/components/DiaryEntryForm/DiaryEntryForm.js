// Path: strateger-react/src/components/Diary/DiaryEntryForm/DiaryEntryForm.js

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  console.log("DiaryEntryForm.js, entry:", entry);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders) || []; 
  const alarms = useSelector((state) => state.alarms.alarms) || []; 
  const strategies = useSelector((state) => state.strategies.items) || []; 
  const diaryEntries = useSelector((state) => state.diary.items) || []; 
  
  
  const [formData, setFormData] = useState(initialState);   //DiaryEntryForm  
  const [errors, setErrors] = useState({});                 //DiaryEntryForm

  const [currentPage, setCurrentPage] = useState(1);        //ReferencesForm
  const [selectedIds, setSelectedIds] = useState([]);       //ReferencesForm
  
  const fileInputRef = useRef(null);                        //PhotosForm



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
            />   

            <ReferencesForm
              alarms={alarms}
              orders={orders}
              strategies={strategies}
              diaryEntries={diaryEntries}
              handleSelectReference={handleSelectReference}
              handleAddId={handleAddId}
              isSelected={isSelected}
              currentPage={currentPage}              
              setCurrentPage={setCurrentPage}
              selectedIds={selectedIds}
            />
              
            
            <div className="flex justify-between">
              <SubmitButton entry={entry} />
              <ClearButton handleClear={handleClear} />
            </div>

          </form>
        } 
      />              
    </div>
  );
};

export default DiaryEntryForm;
