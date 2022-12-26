import PageContainer from "../../components/PageContainer";
import { Button } from "antd";
import { auth } from "../../server/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword    } from "firebase/auth";
 const LoginPage = () => {
   return (
    <PageContainer>
 
 <Button onClick={() => createUserWithEmailAndPassword(auth, "a4addel@gmail.com", "a4addel@gmail.com")}>Register</Button>
 <Button onClick={() => signInWithEmailAndPassword(auth, "a4addel@gmail.com", "a4addel@gmail.com")}>Login</Button>
    </PageContainer>
  );
};

export default LoginPage;
