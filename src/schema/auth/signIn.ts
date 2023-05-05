import * as yup from "yup";

const Schema$API$signIn = yup.object().shape({
    body: yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(10).required(),
    }),
});

const Schema$Client$signIn = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(10).required(),
});

export { Schema$API$signIn, Schema$Client$signIn };
