import * as yup from "yup";

const Schema$API$StreamClip = yup.object().shape({
    query: yup.object().shape({
        clipId: yup.string().uuid().required(),
    }),
});

const Schema$Client$StreamClip = yup.object().shape({
    clipId: yup.string().uuid().required(),
});

export { Schema$API$StreamClip, Schema$Client$StreamClip };
