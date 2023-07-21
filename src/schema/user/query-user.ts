import * as yup from "yup";

const Schema$API$UserQuery = yup.object().shape({
    query: yup.object({
        _email: yup.string().when("_userId", {
            is: (userID: any) => !yup.string().uuid().required().isValid(userID),
            then: () => yup.string().email().required("Either _email or _userId is required"),
            otherwise: () => yup.string().email().optional(),
        }),
        _userId: yup.string().optional(),
    }),
});

const Schema$Client$UserQuery = yup.object().shape({
    _email: yup.string().when("_userId", {
        is: (userID: any) => !yup.string().uuid().required().isValid(userID),
        then: () => yup.string().email().required("Either _email or _userId is required"),
        otherwise: () => yup.string().email().optional(),
    }),
    _userId: yup.string().optional(),
});

export { Schema$API$UserQuery, Schema$Client$UserQuery };
