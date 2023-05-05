import * as yup from "yup";

const Schema$API$InsertClip = yup.object().shape({
    query: yup.object().shape({
        wordId: yup.string().uuid().required(),
    }),
});

const Schema$Client$InsertClip = yup.object().shape({
    wordId: yup.string().uuid().required(),
});

export { Schema$API$InsertClip, Schema$Client$InsertClip };
