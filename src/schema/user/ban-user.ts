import * as yup from "yup";

const Schema$API$BanUser = yup.object({
    query: yup.object({
        userId: yup.string().uuid().required(),
    }),
});
const Schema$Client$BanUser = yup.object({
    userId: yup.string().uuid().required(),
});

export { Schema$API$BanUser, Schema$Client$BanUser };
