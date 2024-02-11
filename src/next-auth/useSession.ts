"use client";

import { session } from "./Provider";
import { useAtom } from "jotai";

function useSessionState() {
  const [s] = useAtom(session);
  return s;
}
export default useSessionState;
