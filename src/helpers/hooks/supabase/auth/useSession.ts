"use client";
import type { Session } from "@supabase/supabase-js"
import { atom, useAtom } from "jotai"
export const sessionState = atom<Session | null>(null)
export function useSession() {
    const [session] = useAtom(sessionState)

    return session;
}