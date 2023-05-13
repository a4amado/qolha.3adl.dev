import * as yup from "yup";

const Schema$API$UserQuery = yup.object().shape({
    query: yup.object({
        _email: yup
            .string()
            .email()
            .when("_userId", {
                // @ts-ignore
                is: (userID) => typeof userID === "undefined",
                then: () => yup.string().required("Either _email or _userId is required"),
                otherwise: () => yup.string().optional(),
            }),
        _userId: yup.string().uuid().optional(),
    }),
});

const Schema$Client$UserQuery = yup.object().shape({
    _email: yup
        .string()
        .email()
        .when("_userId", {
            // @ts-ignore
            is: (userID) => typeof userID === "undefined",
            then: () => yup.string().required("Either _email or _userId is required"),
            otherwise: () => yup.string().optional(),
        }),
    _userId: yup.string().uuid(),
});

export { Schema$API$UserQuery, Schema$Client$UserQuery };
