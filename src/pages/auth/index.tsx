import PageContainer from "../../components/PageContainer";
import { Button, Grid, Input, Row, Typography } from "antd";
import { auth } from "../../server/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Header from "../../components/header";
import { FcGoogle } from "react-icons/fc";
import { Field, Form, Formik } from "formik";
import { schema } from "../api/admin/auth";
import axios from "axios";
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
        <Formik
          onSubmit={(e) =>
            axios({
              method: "POST",
              url: "/api/admin/auth",
              data: e,
            })
          }
          initialValues={{ email: "", password: "" }}
          validationSchema={schema}
        >
          {(props) => {
            return (
              <>
                <Row>Admin Login</Row>
                <Row>
                  <label>Email: </label>
                  <Field as={Input} name="email" type="text" />
                  <Typography>{props.errors.email}</Typography>
                </Row>
                <Row>
                  <label>Password: </label>
                  <Field as={Input} name="password" type="password" />
                  <Typography>{props.errors.password}</Typography>
                </Row>
                <Row>
                  <Button onClick={() => props.handleSubmit()}>Submit</Button>
                </Row>
              </>
            );
          }}
        </Formik>
      </PageContainer>
    </>
  );
};

export default LoginPage;
