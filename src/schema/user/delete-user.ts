import * as yup from "yup";

const Schema$API$DeleteUser = yup.object({
    query: yup.object({
        userId: yup.string().uuid(),
    }),
});

const Schema$Client$DeleteUser = yup.object({
    userId: yup.string().uuid(),
});

export { Schema$API$DeleteUser, Schema$Client$DeleteUser };
