import { Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
export function InternalException(res: Response) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send([ReasonPhrases.INTERNAL_SERVER_ERROR]);
}

export function YupException(res: Response, errors: String[]) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(errors);
}
