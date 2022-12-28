import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import algoliasearch from "algoliasearch";
import isAdmin from "../../../server/common/isAdmin";

const algo = algoliasearch(
  process.env.ALGO_API_ID,
  process.env.ALOG_SEARCH_ONLY_KEY
);

export default nextConnect()
  .use((req: NextApiRequest, res: NextApiResponse, next) => {
    if (!isAdmin.isAdminMiddleware(req)) {
      return res.json("Not Admin");
    }

    next();
  })
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const result = algo.initIndex("sait.3adl.dev");

    const q = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
    if (!q) return res.status(404);

    const results = await result.search(q, {
      hitsPerPage: 6,
    });
    res.json(results.hits || []);
  });
