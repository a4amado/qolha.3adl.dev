import * as yup from "yup";

const Schema$API$InsertRate = yup.object().shape({
    query: yup.object().shape({
        clipId: yup.string().uuid().required(),
        rate: yup.number().oneOf([0, 50, 100]).required(),
    }),
});

const Schema$Client$InsertRate = yup.object().shape({
    rate: yup.number().oneOf([0, 50, 100]).required(),
});

export { Schema$API$InsertRate, Schema$Client$InsertRate };
