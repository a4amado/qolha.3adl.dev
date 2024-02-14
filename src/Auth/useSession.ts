"use client";

import { sessionState } from "./Provider";
import { useAtom } from "jotai";

function useSessionState() {
  const [s] = useAtom(sessionState);
  return s;
}
export default useSessionState;
