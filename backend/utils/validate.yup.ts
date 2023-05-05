import * as yup from "yup";

interface ValidateReturn<T> {
    errors: string[];
    data: T;
}

export default function validateYupSchema<T extends yup.AnyObjectSchema>(schema: T, data: any): ValidateReturn<yup.InferType<T>> {
    try {
        const validatedData = schema.validateSync(data, { abortEarly: false });
        return {
            errors: [],
            data: validatedData,
        };
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            const errors = err.inner.map((e: any) => e.message);
            return {
                errors: errors,
                data: null,
            };
        }
        return {
            errors: ["INTERNAL_SERVER_ERROR"],
            data: null,
        };
    }
}
