import * as yup from "yup";

const Schema$API$QueryClip = yup.object().shape({
    query: yup.object().shape({
        _wordId: yup.string().uuid().optional(),
        _userId: yup.string().uuid().optional(),
        _page: yup.number().integer().min(1).default(1).optional(),
        _order: yup.string().oneOf(["asc", "desc"]).optional(),
        _sort: yup.string().oneOf(["createdAt"]).optional(),
        _limit: yup.number().integer().min(1).max(10).default(1).optional(),
        _accepted: yup.boolean().optional(),
    }),
});

const Schema$Client$QueryClip = yup.object().shape({
    _wordId: yup.string().uuid().optional(),
    _userId: yup.string().uuid().optional(),
    _page: yup.number().integer().min(1).default(1).optional(),
    _order: yup.string().oneOf(["asc", "desc"]).optional(),
    _sort: yup.string().oneOf(["createdAt"]).optional(),
    _limit: yup.number().integer().min(1).max(10).default(1).optional(),
    _accepted: yup.boolean().optional(),
});

export { Schema$API$QueryClip, Schema$Client$QueryClip };
