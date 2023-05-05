import { Schema$Client$QueryWord } from "@schema/word/query-word";
import queryString from "query-string";
import { InferType } from "yup";

type QueryWordArgs = Parameters<typeof queryString.stringifyUrl>[0] & { query: InferType<typeof Schema$Client$QueryWord> };
const QueryWord = (q: QueryWordArgs) => queryString.stringifyUrl(q);
export default QueryWord;
