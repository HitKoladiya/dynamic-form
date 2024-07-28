"use client";
import React from 'react';
import Tooltip from './Tooltip';
import { validateField } from '../utils/validation';

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
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    formData: { [key: string]: any };
}

const FormSection: React.FC<FormSectionProps> = ({ sectionName, fields, handleChange, formData }) => {
    const [fieldErrors, setFieldErrors] = React.useState<{ [key: string]: string[] }>({});

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        handleChange(e);
        const { name, value } = e.target;
        const errors = validateField(value, fields.find(field => field.field_id === name)?.validations || []);
        setFieldErrors(prevErrors => ({ ...prevErrors, [name]: errors }));
    };
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 pt-2 border-t-2 border-black">{sectionName}</h2>
            {fields.map(field => (
                <div key={field.field_id} className="mb-4 grid grid-cols-5 text-center">
                    <label htmlFor={field.field_id} className="block text-wrap text-sm font-medium text-gray-700 mr-3 col-span-2">
                        {field.field_label.replaceAll('/', "/ ")} {field.validations.includes('required') && <span className="text-red-500">*</span>}
                    </label>
                    <div className='col-span-2 mx-2'>
                        {field.field_type === 'text' && (
                            <input
                                type="text"
                                id={field.field_id}
                                name={field.field_id}
                                value={formData[field.field_id] || ''}
                                onChange={handleFieldChange}
                                placeholder={field.info}
                                className="custom-input"
                            />
                        )}
                        {field.field_type === 'radio' && field.field_options && (
                            <div className='grid md:grid-cols-2 grid-cols-1 text-left'>
                                {field.field_options.map(option => (
                                    <label key={option.value} className="mr-4">
                                        <input
                                            type="radio"
                                            id={field.field_id}
                                            name={field.field_id}
                                            value={option.value}
                                            checked={parseInt(formData[field.field_id]) === option.value}
                                            onChange={handleFieldChange}
                                            className="mr-1 w-auto"
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        )}
                        {field.field_type === 'select' && field.field_options && (
                            <select
                                id={field.field_id}
                                name={field.field_id}
                                value={formData[field.field_id] || ''}
                                onChange={handleFieldChange}
                                className="custom-input md:w-44"
                            >
                                <option value="">Select...</option>
                                {field.field_options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}
                        {field.field_type === 'number' && (
                            <input
                                type="number"
                                id={field.field_id}
                                name={field.field_id}
                                value={formData[field.field_id] || ''}
                                onChange={handleFieldChange}
                                placeholder={field.info}
                                className="custom-input"
                            />
                        )}
                        {field.field_type === 'checkbox' && field.field_options && (
                            <div className='grid md:grid-cols-2 grid-cols-1 text-left'>
                                {field.field_options.map(option => (
                                    <label key={option.value} className="mr-4">
                                        <input
                                            type="checkbox"
                                            id={field.field_id}
                                            name={field.field_id}
                                            value={option.value}
                                            checked={formData[field.field_id]?.includes(option.value)}
                                            onChange={handleFieldChange}
                                            className="mr-1 w-auto"
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        )}
                        {field.field_type === 'textarea' && (
                            <textarea
                                id={field.field_id}
                                name={field.field_id}
                                value={formData[field.field_id] || ''}
                                onChange={handleFieldChange}
                                placeholder={field.info}
                                className="custom-input"
                            />
                        )}
                        <div className='flex justify-start md:w-44 w-32'>
                            {fieldErrors[field.field_id] && (
                                <div className="text-red-500 text-sm ">
                                    {fieldErrors[field.field_id].map(error => (
                                        <div key={error}>{error}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {field.info && <Tooltip info={field.info} validation={field.validations} />}
                </div>
            ))}
        </div>
    );
};

export default FormSection;
