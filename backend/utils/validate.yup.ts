import { Schema, ValidationError } from "yup";

interface ValidateReturn {
    errors: String[];
    data: any;
}

export default function validateYupSchema(schema: Schema, data: any): ValidateReturn {
    try {
        schema.validateSync(data, { abortEarly: false });
        return {
            errors: [],
            data,
        };
    } catch (error) {
        if (error instanceof ValidationError) {
            return {
                errors: error.errors,
                data,
            };
        }
        return {
            data: data,
            errors: ["INTERNAL_SERVER_ERROR"],
        };
    }
}
