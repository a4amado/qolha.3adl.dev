import queryString from "query-string";
import { queryWord } from "src/pages/api/word";
import { z } from "zod";

export const QueryWord = (q: Parameters<typeof queryString.stringifyUrl>[0] & z.TypeOf<typeof queryWord>) => queryString.stringifyUrl({
    ...q
})
