import { Schema$Client$QueryClip } from "@schema/clip/query-clip";
import queryString from "query-string";
import { InferType } from "yup";

type QueryClipArgs = Parameters<typeof queryString.stringifyUrl>[0] & { query: InferType<typeof Schema$Client$QueryClip> };
export const QueryClip = (q: QueryClipArgs) => queryString.stringifyUrl(q);
