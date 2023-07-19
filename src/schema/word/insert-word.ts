import * as yup from "yup";

const Schema$API$InsertWord = yup.object({
    body: yup.object({
        word: yup.string().required(),
    }),
});

const Schema$Client$InsertWord = yup.object().shape({
    word: yup.string().required().required(),
    description_ar: yup.string(),
    description_en: yup.string(),
});

export { Schema$Client$InsertWord, Schema$API$InsertWord };
