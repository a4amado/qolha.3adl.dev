import { NextFunction, Request, Response } from "express";
import schemaObject, { schemaName } from "../schmea.yup";

import { ValidationError } from "yup";
import { YupException } from "../utils/exception";

export default function Validate(schmea: schemaName) {
    return (req: Request, res: Response, Next: NextFunction) => {
        try {
            schemaObject[schmea].validateSync(req, { abortEarly: false });
            Next();
        } catch (error) {
            if (error instanceof ValidationError) {
                return YupException(res, error.errors);
            }
        }
    };
}
