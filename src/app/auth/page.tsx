"use client";

import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { supabaseclient } from "~/Auth/client";

const App = () => (
  <Auth
    supabaseClient={supabaseclient}
    appearance={{ theme: ThemeSupa }}
    redirectTo={typeof document != null ? `${document.location.protocol}://${document.location.host}/auth`: ""}
    providers={[]}
  />
);

export default App;
