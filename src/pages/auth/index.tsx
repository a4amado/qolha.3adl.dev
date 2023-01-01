import PageContainer from "../../components/PageContainer";
import { Button, Typography } from "antd";
import { auth } from "../../server/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Header from "../../components/header";
import { FcGoogle } from "react-icons/fc";
const gAuth = new GoogleAuthProvider();

const LoginPage = () => {
  return (
    <>
      <Header isSearch={false} />
      <PageContainer>
        <Typography.Title>الدخول</Typography.Title>
        <Button
          onClick={() =>
            signInWithPopup(auth, gAuth).then(() => {
              window.location.replace("/contribute");
            })
          }
          className="w-full h-auto"
        >
          <FcGoogle className="block mx-auto text-5xl" />
        </Button>
      </PageContainer>
    </>
  );
};

export default LoginPage;
