// Function to validate a single field based on given rules
export const validateField = (value: string, rules: string[]): string[] => {
    const errors: string[] = [];

    // Iterate over each validation rule for the field
    rules.forEach(rule => {
        // Check for required field
        if (rule === 'required' && !value) {
            errors.push('This field is required.');
        }
        // Check for alphabetic characters only
        if (rule === 'alphabets' && !/^[a-zA-Z\s]+$/.test(value)) {
            errors.push('This field should contain only alphabets.');
        }
        // Check for alphanumeric characters
        if (rule === 'alphanumeric' && !/^[a-zA-Z0-9\s]+$/.test(value)) {
            errors.push('This field should contain only alphabets and numbers.');
        }
        // Check for numeric values only
        if (rule === 'numeric' && !/^\d+$/.test(value)) {
            errors.push('This field should contain only numbers.');
        }
        // Check for minimum value
        if (rule.startsWith('min_value_')) {
            const minValue = parseInt(rule.split('_')[2]);
            if (parseInt(value) < minValue) {
                errors.push(`Value should not be less than ${minValue}.`);
            }
        }
        // Check for maximum value
        if (rule.startsWith('max_value_')) {
            const maxValue = parseInt(rule.split('_')[2]);
            if (parseInt(value) > maxValue) {
                errors.push(`Value should not exceed ${maxValue}.`);
            }
        }
        // Check for positive numbers
        if ((rule === 'positive_number' || rule === 'positive') && parseInt(value) < 0) {
            errors.push('Value should be positive.');
        }
        // Check for valid date format (dd/mm/yyyy)
        if (rule === 'date' && !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
            errors.push('Date should be in dd/mm/yyyy format.');
        }
        // Check for a valid email format
        if (rule === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            errors.push('Invalid email address.');
        }
        // Check for a valid phone number (10 digits)
        if (rule === 'phone' && !/^\d{10}$/.test(value)) {
            errors.push('Invalid phone number.');
        }
        // Check for valid currency format
        if (rule === 'currency' && !/^\d+((\$)|€|£|¥|₹)$/i.test(value)) {
            errors.push('Enter a valid currency amount (e.g., $100).');
        }
    });
    return errors;
};

// Function to validate the entire form
export const validateForm = (formValues: { [key: string]: any }, formFields: any[]): { [key: string]: string[] } => {
    const formErrors: { [key: string]: string[] } = {};

    // Iterate over each field in the form
    formFields.forEach(field => {
        // Validate the field and collect errors
        const fieldErrors = validateField(formValues[field.field_id] || '', field.validations);
        if (fieldErrors.length > 0) {
            formErrors[field.field_id] = fieldErrors;
        }
    });
    return formErrors;
};
