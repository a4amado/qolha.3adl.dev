import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import HttpCodes from "http-status-codes";
import prisma from "@utils/prismadb";

export const reasons_for_the_report_word = [
    "NOT_ARABIC_WORD",
    "TYPO"
]

const router = nextConnect({
    onNoMatch: (req, res) => {
        // @ts-ignore
        return res.status(404).end();
    },
    onError: (req, res) => {
        // @ts-ignore
        return res.status(500).end();
    }
});

import * as yup from "yup";


const report_word_schema  = yup.object().shape({
    wordID: yup.string().required().uuid(),
    reason: yup.string().required().oneOf(reasons_for_the_report_word)
})

router.post(async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        await report_word_schema.validate(req.query)
    } catch (error) {
        return res.status(HttpCodes.UNPROCESSABLE_ENTITY).json(error)
    };

    
    













})


export default router