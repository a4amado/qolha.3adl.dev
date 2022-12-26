import PageContainer from "../../components/PageContainer";
import { Button } from "antd";
import { auth } from "../../server/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const g = new GoogleAuthProvider();
const LoginPage = () => {
  return (
    <PageContainer>
      <Button onClick={() => signInWithPopup(auth, g)}>Login</Button>
    </PageContainer>
  );
};

export default LoginPage;
