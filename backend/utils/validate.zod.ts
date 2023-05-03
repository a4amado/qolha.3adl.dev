import { log } from "console";
import { z } from "zod";

interface ValidateReturn<T> {
    errors: string[];
    data: T;
}

export default function validateZodSchema<T extends z.ZodType<any>>(schema: T, data: unknown): ValidateReturn<z.TypeOf<T>> {
    const validatedData = schema.safeParse(data);

    if (validatedData.success) {
        return {
            errors: [],
            data: validatedData.data as z.TypeOf<typeof schema>,
        };
    }

    return {
        errors: validatedData.error.errors.map((e) => e.message),
        data: null,
    };
}
