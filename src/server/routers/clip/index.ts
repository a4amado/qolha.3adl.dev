import { router } from "src/server/trpc";
import getClipThatNeedsRevision from "./getClipThatNeedsRevision";
import AcceptClip from "./acceptClip";
import rejectClip from "./rejectClip";
import queryClip from "./queryClip";

const clipRouter = router({
    getClipThatNeedsRevision,
    accept: AcceptClip,
    reject: rejectClip,
    query: queryClip,
});

export default clipRouter;
