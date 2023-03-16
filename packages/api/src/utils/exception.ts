import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { Response } from "express";

export function InternalException(res: Response, error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
}

export function YupException(res: Response, errors: String[]) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(errors).end();
}
