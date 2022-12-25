import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import { Button } from "antd";

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("test").select("*");
      // @ts-ignore next-line
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  if (!user) {
    return (
      <PageContainer>
        <Auth
          redirectTo="https://jgyzpbionzzxtjxmomjq.supabase.co/auth/v1/callback"
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
          providers={["google"]}
          socialLayout="horizontal"
        />
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer>
        <Button
          type="primary"
          danger
          shape="round"
          onClick={() => supabaseClient.auth.signOut()}
        >
          Sign out
        </Button>
      </PageContainer>
    </>
  );
};

export default LoginPage;
