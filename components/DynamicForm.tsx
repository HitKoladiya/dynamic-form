"use client";
import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { toast } from "sonner";
import { validateForm } from '../utils/validation';
import { Field, FormData } from '../types/formTypes';

const DynamicForm = () => {
    const [formData, setFormData] = useState<FormData | null>(null); // State to hold the form structure data
    const [formValues, setFormValues] = useState<{ [key: string]: any }>({}); // State to hold the current values of form fields

    // Fetch form data and saved form values from localStorage on component mount
    useEffect(() => {
        try {
            fetch('/data.json')
                .then(res => res.json())
                .then(data => setFormData(data));
        } catch (e) {
            console.log(e)
            toast.error('Failed to fetch form data!');
        }
        const savedFormValues = localStorage.getItem('formValues');
        if (savedFormValues) {
            setFormValues(JSON.parse(savedFormValues));
        }
    }, []);

    // Save form values to localStorage whenever formValues state changes
    useEffect(() => {
        if (formValues && Object.keys(formValues).length === 0) return;
        localStorage.setItem('formValues', JSON.stringify(formValues));
    }, [formValues]);

    // Handle changes to form fields and update formValues state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form fields
        if (!formData) return;
        const formErrors = validateForm(formValues, formData.fields);

        // If there are validation errors, display an error toast and return
        if (Object.keys(formErrors).length > 0) {
            toast.error('Please fill all the required fields correctly!');
            return;
        }

        // form submission to an API
        // try {
        //     const response = await fetch('/api/submit-form', {
        //         method: 'POST',
        //         body: JSON.stringify(formValues),
        //     });
        //     if (!response.ok) {
        //         toast.error('Failed to submit form!');
        //         return;
        //     }
        // } catch (e) {
        //     console.log(e);
        //     toast.error('Failed to submit form!');
        //     return;
        // }

        // If form submission is successful, display a success toast
        toast.success('Form submitted successfully!');

        // Clear form values and localStorage
        setFormValues({});
        localStorage.removeItem('formValues');
    };

    // Show loading text if formData is not yet loaded
    if (!formData) return <p>Loading...</p>;

    // Group form fields by sections
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
            <form onSubmit={handleSubmit} className='border border-gray-600 shadow-2xl p-8 bg-white'>
                <h1 className="text-2xl font-bold mb-6 text-center">{formData.form_header}</h1>
                {/* Render form sections */}
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
            <button>
                change json
            </button>
        </div>
    );
};

export default DynamicForm;
