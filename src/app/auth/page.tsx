"use client";

import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useLocation } from "react-use";
import { supabaseclient } from "~/Auth/client";

const App = () => {
  const link = useLocation();

  return (
    <Auth
      supabaseClient={supabaseclient}
      appearance={{ theme: ThemeSupa }}
      redirectTo={`${link.protocol}://${link.host}/auth`}
      providers={[]}
    />
  );
};

export default App;
