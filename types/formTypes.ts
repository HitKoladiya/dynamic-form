export interface Field {
    section: number;
    section_name: string;
    field_id: string;
    field_label: string;
    field_type: string;
    validations: string[];
    info: string;
    field_options?: { value: string | number; label: string }[];
}

export interface FormData {
    form_header: string;
    fields: Field[];
}