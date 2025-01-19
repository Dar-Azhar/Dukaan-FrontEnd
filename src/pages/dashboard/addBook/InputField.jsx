import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder, defaultValue }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <input
                type={type}
                {...register(name, { required: true })}
                className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder={placeholder}
                defaultValue={defaultValue}
                step="0.01"
                />
                
        </div>
    );
};

export default InputField;
