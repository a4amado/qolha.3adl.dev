import * as yup from "yup";

const Schema$API$InsertWord = yup.object({
    body: yup.object({
        word: yup.string().matches(/^[\u0600-\u06FF\s]+$/),
        description: yup.string(),
    }),
});

const Schema$Client$InsertWord = yup.object().shape({
    word: yup
        .string()
        .required()
        .matches(/^[\u0600-\u06FF\s]+$/, "String must be in Arabic"),
    description: yup.string(),
});

export { Schema$Client$InsertWord, Schema$API$InsertWord };
