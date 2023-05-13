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
        console.log(err);

        // @ts-ignore
        const errors: yup.ValidationError = err.inner.map((e: any) => e.message);
        return {
            // @ts-ignore
            errors: errors,
            data: null,
        };
    }
}
