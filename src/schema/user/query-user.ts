import * as yup from "yup";

const Schema$API$UserQuery = yup.object().shape({
    query: yup.object().shape({
        _email: yup
            .string()
            .email()
            .when("_userId", {
                is: undefined,
                then: yup.string().required("Either _email or _userId is required"),
                otherwise: yup.string().optional(),
            }),
        _userId: yup
            .string()
            .uuid()
            .when("_email", {
                is: undefined,
                then: yup.string().required("Either _email or _userId is required"),
                otherwise: yup.string().optional(),
            }),
    }),
});

const Schema$Client$UserQuery = yup.object().shape({
    _email: yup
        .string()
        .email()
        .when("_userId", {
            is: undefined,
            then: yup.string().required("Either _email or _userId is required"),
            otherwise: yup.string().optional(),
        }),
    _userId: yup
        .string()
        .uuid()
        .when("_email", {
            is: undefined,
            then: yup.string().required("Either _email or _userId is required"),
            otherwise: yup.string().optional(),
        }),
});

export { Schema$API$UserQuery, Schema$Client$UserQuery };
