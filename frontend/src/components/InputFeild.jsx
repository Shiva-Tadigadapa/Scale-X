import React from 'react';

const InputField = ({ label, name, value, onChange }) => {
  return (
    <div className='flex  gap-10 items-center'>
      <h1 className='text-white '>{label}</h1>
      <input
        className='   w-64   px-4 py-3 rounded-md bg-transparent border-white/50 border outline-none text-white  '
        type="text"
        placeholder={`Enter ${label}`}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
