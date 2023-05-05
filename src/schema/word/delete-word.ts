import * as yup from "yup";

const Schema$API$DeleteWord = yup.object().shape({
    query: yup.object({
        wordId: yup.string().uuid(),
    }),
});

const Schema$Client$DeleteWord = yup.object().shape({
    wordId: yup.string().uuid(),
});

export { Schema$API$DeleteWord, Schema$Client$DeleteWord };
