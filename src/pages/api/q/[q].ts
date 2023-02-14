import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import HttpCodes from "http-status-codes";
import { v4 } from "uuid";
// import algoliasearch from "algoliasearch";

// const algo = algoliasearch(
//   process.env.ALGO_API_ID,
//   process.env.ALOG_SEARCH_ONLY_KEY
// );

export default nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    // const result = algo.initIndex("sait.3adl.dev");

    // const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
    // if (!q) return res.status(404);

    // const results = await result.search(q, {
    // hitsPerPage: 6,
    // });
    return new Promise((reso) => {
      setTimeout(() => {
        res.status(HttpCodes.OK).json(
          Array.from({ length: 10 }, () => ({
            ar: "أنا",
            id: v4(),
          }))
        );
      }, 3000);
    });
  }
);
