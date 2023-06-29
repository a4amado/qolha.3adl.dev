import { router } from "src/server/trpc";
import getClipThatNeedsRevision from "./getClipThatNeedsRevision";
import AcceptClip from "./acceptClip";
import rejectClip from "./rejectClip";

const clipRouter = router({
    getClipThatNeedsRevision,
    accept: AcceptClip,
    reject: rejectClip,
});

export default clipRouter;
