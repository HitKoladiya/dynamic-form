
export const validateField = (value: string, rules: string[]): string[] => {
    const errors: string[] = [];

    rules.forEach(rule => {
        if (rule === 'required' && !value) {
            errors.push('This field is required.');
        }
        if (rule === 'alphabets' && !/^[a-zA-Z\s]+$/.test(value)) {
            errors.push('This field should contain only alphabets.');
        }
        if (rule === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            errors.push('Invalid email address.');
        }
        if (rule === 'phone' && !/^\d{10}$/.test(value)) {
            errors.push('Invalid phone number.');
        }
        if (rule.startsWith('min_value_')) {
            const minValue = parseInt(rule.split('_')[2]);
            if (parseInt(value) < minValue) {
                errors.push(`Value should not be less than ${minValue}.`);
            }
        }
        if (rule.startsWith('max_value_')) {
            const maxValue = parseInt(rule.split('_')[2]);
            if (parseInt(value) > maxValue) {
                errors.push(`Value should not exceed ${maxValue}.`);
            }
        }
        if((rule==='positive_number' || rule==='positive') && parseInt(value) < 0){
            errors.push('Value should be positive.');
        }
        if(rule==="currency" && !/^\d+((\$)|€|£|¥|₹)$/i.test(value)
        ){
            errors.push('Invalid currency value.');
        }
        if(rule==='alphanumeric' && !/^[a-zA-Z0-9\s]+$/.test(value)){
            errors.push('This field should contain only alphabets and numbers.');
        }
        if(rule==='date' && 
            !/^\d{2}\/\d{2}\/\d{4}$/.test(value)
        ){
            errors.push('Date should be in dd/mm/yyyy format.');
        }
        if(rule === 'numeric' && !/^\d+$/.test(value)){
            errors.push('This field should contain only numbers.');
        }
    });

    return errors;
};

export const validateForm = (formValues: { [key: string]: any }, formFields: any[]): { [key: string]: string[] } => {
    const formErrors: { [key: string]: string[] } = {};

    formFields.forEach(field => {
        const fieldErrors = validateField(formValues[field.field_id] || '', field.validations);
        if (fieldErrors.length > 0) {
            formErrors[field.field_id] = fieldErrors;
        }
    });

    return formErrors;
};  