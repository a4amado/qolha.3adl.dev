
import { Schema$Client$QueryClip } from "@schema/clip/query-clip";
import queryString from "query-string";
import { InferType } from "yup";

export const QueryClip = (q: Parameters<typeof queryString.stringifyUrl>[0] & { query: InferType<typeof Schema$Client$QueryClip> }) => queryString.stringifyUrl(q);
