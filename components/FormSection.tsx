"use client";
import React from 'react';
import Tooltip from './Tooltip';

interface Field {
    section: number;
    section_name: string;
    field_id: string;
    field_label: string;
    field_type: string;
    validations: string[];
    info: string;
    field_options?: { value: string | number; label: string }[];
}

interface FormSectionProps {
    sectionName: string;
    fields: Field[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    formData: { [key: string]: any };
}

const FormSection: React.FC<FormSectionProps> = ({ sectionName, fields, handleChange, formData }) => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pt-2 border-t-2 border-black">{sectionName}</h2>
            {fields.map(field => (
                <div key={field.field_id} className="mb-4 grid grid-cols-5 text-center">
                    <label htmlFor={field.field_id} className="block text-sm font-medium text-gray-700 mr-3 self-center col-span-2">
                        {field.field_label}
                    </label>
                    {field.field_type === 'text' && (
                        <input
                            type="text"
                            id={field.field_id}
                            name={field.field_id}
                            value={formData[field.field_id] || ''}
                            onChange={handleChange}
                            className="mt-1 block w-auto shadow-sm sm:text-sm border-gray-300 rounded-md col-span-2"
                        />
                    )}
                    {field.field_type === 'radio' && field.field_options && (
                        <div className='col-span-2'>
                            <div className='grid md:grid-cols-2 grid-cols-1'>
                            {field.field_options.map(option => (
                                <label key={option.value} className="mr-4">
                                    <input
                                        type="radio"
                                        id={field.field_id}
                                        name={field.field_id}
                                        value={option.value}
                                        checked={parseInt(formData[field.field_id]) === option.value}
                                        onChange={handleChange}
                                        className="mr-1 w-auto"
                                        />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                    )}
                    {field.field_type === 'select' && field.field_options && (
                        <select
                        id={field.field_id}
                            name={field.field_id}
                            value={formData[field.field_id] || ''}
                            onChange={handleChange}
                            className="mt-1 block w-auto shadow-sm sm:text-sm border-gray-300 rounded-md col-span-2"
                        >
                            <option value="">Select...</option>
                            {field.field_options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                    {field.info && <Tooltip message={field.info} />}
                </div>
            ))}
        </div>
    );
};

export default FormSection;
