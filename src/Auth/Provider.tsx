"use client";

import { Session } from "@supabase/supabase-js";
import { atom, useAtom } from "jotai";
import { PropsWithChildren, useEffect } from "react";

import { supabaseclient } from "./client";
import { useCookie } from "react-use";

type SS = {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
};
export const sessionState = atom<SS>({
  session: null,
  status: "loading",
});

export default function NextAuthProvider({ children }: PropsWithChildren) {
  const [_, setSession] = useAtom(sessionState);
  const [cookie, setSessionCookie, deleteSessionCookie] = useCookie("session");
  

  useEffect(() => {
    supabaseclient.auth
      .getSession()
      .then(({ data, error }) => {
        setSessionCookie(data.session?.access_token || "")
        setSession({
          session: data.session,
          status: !data.session ? "unauthenticated" : "authenticated",
        });
        supabaseclient.auth.onAuthStateChange((event, session) => {
          setSessionCookie(session?.access_token || "")
          if (event === "SIGNED_OUT") deleteSessionCookie()
          setSession({
            session: event == "SIGNED_OUT" ? null : session,
            status: event == "SIGNED_OUT" ? "unauthenticated" : "authenticated",
          });
        });
      })
      .catch(() => {
        deleteSessionCookie()
        setSession({
          session: null,
          status: "unauthenticated",
        });
      });
  }, []);

  return <>{children}</>;
}
