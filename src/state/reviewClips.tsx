import { atom } from "jotai";
import { RouterOutputs } from "~/trpc/shared";

export type ReviewClipItem =
  RouterOutputs["clip"]["get15WordThatNeedsRevision"][number];

export const clipsState = atom<ReviewClipItem[] | null>(null);
