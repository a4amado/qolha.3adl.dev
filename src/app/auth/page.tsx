"use client";

import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
 import { Flex } from "antd";
import { useLocation } from "react-use";
import { supabaseclient } from "~/Auth/client";

const App = () => {
  const link = useLocation();

  return (
   <Flex className="w-full max-w-7xl mx-auto"> <Auth
   supabaseClient={supabaseclient}
   appearance={{ theme: ThemeSupa }}
   redirectTo={`${link.protocol}://${link.host}/auth`}
   providers={[]}
 /></Flex>
  );
};

export default App;
