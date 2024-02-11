"use client";

import { atom, useAtom } from "jotai";
import { Session } from "next-auth";
import { PropsWithChildren, useEffect } from "react";
import { api } from "~/trpc/react";
type status = "loading" | "authenticated" | "unauthenticated";

type State = { status: status; data: Session["user"] | null };
const defaultStaet: State = {
  status: "loading",
  data: null,
};
export const session = atom<State>(defaultStaet);

export default function NextAuthProvider({ children }: PropsWithChildren) {
  const session_ = api.auth.session.useQuery();
  const [_, setSession] = useAtom(session);

  useEffect(() => {
    session_
      .refetch()
      .then((e) => {
        if (e.data) {
          setSession({
            status: "authenticated",
            // @ts-ignore
            data: e.data.user,
          });
        } else {
          setSession({
            status: "unauthenticated",
            data: null,
          });
        }
      })
      .catch(() => {
        setSession({
          status: "unauthenticated",
          data: null,
        });
      });
  }, []);

  useEffect(() => {
    const it = setInterval(() => {
      session_
        .refetch()
        .then((e) => {
          if (e.data) {
            setSession({
              status: "authenticated",
              // @ts-ignore
              data: e.data.user,
            });
          } else {
            setSession({
              status: "unauthenticated",
              data: null,
            });
          }
        })
        .catch(() => {
          setSession({
            status: "unauthenticated",
            data: null,
          });
        });
    }, 100_000_000);
    return () => clearInterval(it);
  }, [session_]);

  return <>{children}</>;
}
