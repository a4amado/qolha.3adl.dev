import * as yup from "yup";

const Schema$API$DeleteClip = yup.object().shape({
    query: yup.object().shape({
        clipId: yup.string().uuid().required(),
    }),
});

const Schema$Client$DeleteClip = yup.object().shape({
    clipId: yup.string().uuid().required(),
});

export { Schema$API$DeleteClip, Schema$Client$DeleteClip };
