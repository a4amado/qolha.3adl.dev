import * as yup from "yup";

const Schema$API$UpdateRole = yup.object({
    query: yup.object({
        userId: yup.string().uuid().required(),
    }),
    body: yup.object({
        role: yup.string().oneOf(["admin", "user", "owner"]).required(),
    }),
});

const Schema$Client$UpdateRole = yup.object({
    userId: yup.string().uuid(),
    role: yup.string().oneOf(["admin", "user", "owner"]).required(),
});

export { Schema$API$UpdateRole, Schema$Client$UpdateRole };
