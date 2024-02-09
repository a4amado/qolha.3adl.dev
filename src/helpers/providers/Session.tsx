"use client";
import React from "react";
import { sessionState } from "../hooks/supabase/auth/useSession";
import { useAtom } from "jotai";
import { client } from "~/supabase/client";



export function SupabaseSessionProvider({ children }: React.PropsWithChildren) {
    const [_, setSession] = useAtom(sessionState);
    React.useEffect(() => {
        client.auth.getSession().then(({ data, error }) => {
            if (error) {
                setSession(null);
                return;
            }
            // @ts-ignore
            setSession(data.session)


            client.auth.onAuthStateChange((_, session) => {
                setSession(session)
            })
        })
    }, [])
    console.log(_);

    return <>
        {children}
    </>
}