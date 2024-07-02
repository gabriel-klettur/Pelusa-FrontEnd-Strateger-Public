import React from 'react';

const renderInputField = (label, name, value, handleChange) => (
  <div className="mb-4 grid grid-cols-4 gap-4">
    <label className="block text-gray-700 col-span-3 text-right pt-2">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      className="border border-gray-300 rounded-md shadow-sm p-2 col-span-1"
    />
  </div>
);

const TPSLOptions = ({ formState, handleChange, fields }) => (
  <div className="grid grid-cols-2 gap-4">
    {fields.map((field) => (
      <div key={field.name} className="col-span-1">
        {renderInputField(field.label, field.name, formState[field.name], handleChange)}
      </div>
    ))}
  </div>
);

export default TPSLOptions;
