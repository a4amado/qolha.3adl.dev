import PageContainer from "../../components/PageContainer";
import { Button } from "antd";
import { auth } from "../../server/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Header from "../../components/header";
const gAuth = new GoogleAuthProvider();

const LoginPage = () => {
  return (
    <>
      <Header isSearch={false} />
      <PageContainer>
        <Button
          onClick={() =>
            signInWithPopup(auth, gAuth).then(() => {
              window.location.replace("/contribute");
            })
          }
        >
          Register
        </Button>
      </PageContainer>
    </>
  );
};

export default LoginPage;
