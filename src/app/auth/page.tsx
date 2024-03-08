"use client";

import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { Flex } from "antd";
import { useEffect } from "react";
import { useLocation } from "react-use";
import { supabaseclient } from "~/Auth/client";

const App = () => {
  const link = useLocation();
  useEffect(() => {
    const container = document.querySelector(".ididid");
    container?.parentElement?.parentElement?.classList.add("mx-auto")
    container?.parentElement?.parentElement?.classList.add("w-full")
    container?.parentElement?.parentElement?.classList.add("max-w-2xl")
  }, [])
  return (
    <Auth
    supabaseClient={supabaseclient}
    appearance={{ theme: ThemeSupa, extend: true, className: {
      container:  "ididid" 
    }}}
    redirectTo={`${link.protocol}://${link.host}/auth`}
    providers={[]}
    
  />
   );
};

export default App;
