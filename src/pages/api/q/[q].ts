import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import algoliasearch from "algoliasearch";
import isAdmin from "../../../server/common/isAdmin";

const algo = algoliasearch(
  process.env.ALGO_API_ID,
  process.env.ALOG_SEARCH_ONLY_KEY
);

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
        res.json([
          {
            id: "-NJb6v1hM78-Y8VgfkFp",
            ar: "الفضاء",
            en: "space",
            objectID: "dd2cd53b4fffe_dashboard_generated_id",
            _highlightResult: {
              id: {
                value: "-NJb6v1hM78-<em>Y</em>8VgfkFp",
                matchLevel: "full",
                fullyHighlighted: false,
                matchedWords: ["y"],
              },
              ar: { value: "الفضاء", matchLevel: "none", matchedWords: [] },
              en: { value: "space", matchLevel: "none", matchedWords: [] },
            },
          },
          {
            id: "-NJb6v-ysOTdLXgoZID0",
            ar: "بعد",
            en: "after",
            objectID: "d1466f80360d4_dashboard_generated_id",
            _highlightResult: {
              id: {
                value: "-NJb6v-<em>y</em>sOTdLXgoZID0",
                matchLevel: "full",
                fullyHighlighted: false,
                matchedWords: ["y"],
              },
              ar: { value: "بعد", matchLevel: "none", matchedWords: [] },
              en: { value: "after", matchLevel: "none", matchedWords: [] },
            },
          },
          {
            id: "-NJb6v-YaMa3GO8gLc7-",
            ar: "القيام",
            en: "do",
            objectID: "a19c7e1307caf_dashboard_generated_id",
            _highlightResult: {
              id: {
                value: "-NJb6v-<em>Y</em>aMa3GO8gLc7-",
                matchLevel: "full",
                fullyHighlighted: false,
                matchedWords: ["y"],
              },
              ar: { value: "القيام", matchLevel: "none", matchedWords: [] },
              en: { value: "do", matchLevel: "none", matchedWords: [] },
            },
          },
          {
            id: "-NJb6v-YaMa3GO8gLc6z",
            ar: "التي",
            en: "which",
            objectID: "1f9d4e8dbefaa1_dashboard_generated_id",
            _highlightResult: {
              id: {
                value: "-NJb6v-<em>Y</em>aMa3GO8gLc6z",
                matchLevel: "full",
                fullyHighlighted: false,
                matchedWords: ["y"],
              },
              ar: { value: "التي", matchLevel: "none", matchedWords: [] },
              en: { value: "which", matchLevel: "none", matchedWords: [] },
            },
          },
          {
            id: "-NJb6v-ysOTdLXgoZID1",
            ar: "ظهر",
            en: "back",
            objectID: "1edfebff578b44_dashboard_generated_id",
            _highlightResult: {
              id: {
                value: "-NJb6v-<em>y</em>sOTdLXgoZID1",
                matchLevel: "full",
                fullyHighlighted: false,
                matchedWords: ["y"],
              },
              ar: { value: "ظهر", matchLevel: "none", matchedWords: [] },
              en: { value: "back", matchLevel: "none", matchedWords: [] },
            },
          },
          {
            id: "-NJb6v2tjhCeqHnQ2n_Y",
            ar: "ثمانية",
            en: "eight",
            objectID: "1de1e75d370d55_dashboard_generated_id",
            _highlightResult: {
              id: {
                value: "-NJb6v2tjhCeqHnQ2n_<em>Y</em>",
                matchLevel: "full",
                fullyHighlighted: false,
                matchedWords: ["y"],
              },
              ar: { value: "ثمانية", matchLevel: "none", matchedWords: [] },
              en: { value: "eight", matchLevel: "none", matchedWords: [] },
            },
          },
        ]);
      }, 3000);
    });
  }
);
