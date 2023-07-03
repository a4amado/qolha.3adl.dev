import * as yup from "yup";

const Schema$API$DeleteWord = yup.object().shape({
    query: yup.object({
        wordId: yup.string().uuid().required(),
    }),
});

const Schema$Client$DeleteWord = yup.object().shape({
    wordId: yup.string().uuid().required(),
});

export { Schema$API$DeleteWord, Schema$Client$DeleteWord };
