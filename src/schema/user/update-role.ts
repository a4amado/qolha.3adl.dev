import * as yup from "yup";

const Schema$API$UpdateRole = yup.object({
    query: yup.object({
        userId: yup.string().uuid().required(),

    }),
    body: yup.object({
        role: yup.string().oneOf(["admin", "user"]).required(),
    })
});

const Schema$Client$UpdateRole = yup.object({
    userId: yup.string().uuid(),
    role: yup.string().oneOf(["admin", "user"]),
});

export { Schema$API$UpdateRole, Schema$Client$UpdateRole };
