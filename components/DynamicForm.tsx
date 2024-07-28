"use client";
import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { toast } from "sonner";
import {validateForm} from '../utils/validation';

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

interface FormData {
    form_header: string;
    fields: Field[];
}

const DynamicForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData | null>(null);
    const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setFormData(data));
    }, []);

    useEffect(() => {
        const savedFormValues = localStorage.getItem('formValues');
        if (savedFormValues) {
            setFormValues(JSON.parse(savedFormValues));
        }
    }, []);

    useEffect(() => {
        if (formValues && Object.keys(formValues).length === 0) return;
        localStorage.setItem('formValues', JSON.stringify(formValues));
    }, [formValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formValues);


        // Validate form
        if(!formData) return;
        const formErrors = validateForm(formValues, formData.fields);
        console.log('Form errors:', formErrors);

        if (Object.keys(formErrors).length > 0) {
            toast.error('Please fill all the required fields!');
            return;
        }
        

        // // Post formValues to an API
        // const response =await fetch('/api/submit-form', {
        //     method: 'POST',
        //     body: JSON.stringify(formValues),
        // });

        // if (!response.ok) {
        //     toast.error('Failed to submit form!');
        //     return;
        // }
        toast.success('Form submitted successfully!');

        // Clear formValues
        setFormValues({});

        // Clear localStorage
        localStorage.removeItem('formValues');
    };

    if (!formData) return (
            <p>Loading...</p>
    );


    const sections = formData.fields.reduce((acc, field) => {
        const { section, section_name } = field;
        if (!acc[section]) {
            acc[section] = { section_name, fields: [] };
        }
        acc[section].fields.push(field);
        return acc;
    }, {} as { [key: number]: { section_name: string; fields: Field[] } });

    return (
        <div className='flex justify-center m-8'>
            <form onSubmit={handleSubmit} className='border border-gray-600 shadow-2xl p-8 bg-gray-200'>
                <h1 className="text-2xl font-bold mb-6 text-center">{formData.form_header}</h1>
                {Object.entries(sections).map(([section, { section_name, fields }]) => (
                    <FormSection
                        key={section}
                        sectionName={section_name}
                        fields={fields}
                        handleChange={handleChange}
                        formData={formValues}
                    />
                ))}
                <div className='flex justify-center'>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DynamicForm;
