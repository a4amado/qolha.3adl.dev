import * as yup from "yup";

const Schema$API$AcceptClip = yup.object().shape({
    query: yup.object().shape({
        clipId: yup.string().uuid().required(),
    }),
});

const Schema$Client$AcceptClip = yup.object().shape({
    clipId: yup.string().uuid().required(),
});

export { Schema$API$AcceptClip, Schema$Client$AcceptClip };
