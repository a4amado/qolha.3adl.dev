import { Schema$Client$UserQuery } from "@schema/user/query-user";
import queryString from "query-string";
import { InferType } from "yup";

type QueryUserArgs = Parameters<typeof queryString.stringifyUrl>["0"] & {
    query: InferType<typeof Schema$Client$UserQuery>;
};
const queryUserGen = (q: QueryUserArgs) => {
    return queryString.stringifyUrl(q);
};
export default queryUserGen;
