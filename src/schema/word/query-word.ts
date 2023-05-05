import * as yup from "yup";

const Schema$API$QueryWord = yup.object().shape({
    query: yup.object().shape({
        _sort: yup.string().oneOf(["clips", "date"]).optional(),
        _order: yup.string().oneOf(["asc", "desc"]).optional(),
        _userID: yup.string().uuid().optional(),
        _email: yup.string().email().optional(),
        _limit: yup.number().positive().min(1).optional(),
        _page: yup.number().positive().min(1).optional(),
    }),
});

const Schema$Client$QueryWord = yup.object().shape({
    _sort: yup.string().oneOf(["clips", "date"]).optional(),
    _order: yup.string().oneOf(["asc", "desc"]).optional(),
    _userID: yup.string().uuid().optional(),
    _email: yup.string().email().optional(),
    _limit: yup.number().positive().min(1).optional(),
    _page: yup.number().positive().min(1).optional(),
});

export { Schema$API$QueryWord, Schema$Client$QueryWord };
