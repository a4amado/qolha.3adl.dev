import { ValidationError } from "yup";

interface ErrorProps {
    source: "INTERNAL" | "YUP" | "CUSTOM";
    msg: string;
}

export default class CustomError extends Error {
    code: number;
    details: ErrorProps[] = [];

    constructor({ code }: { code: number }) {
        super();
        this.code = code;
    }

    yup(yupError: ValidationError) {
        const listOfErrors: ErrorProps[] = yupError.errors.map((e) => ({
            msg: e,
            source: "YUP",
        }));
        this.details.push(...listOfErrors);
    }
}
