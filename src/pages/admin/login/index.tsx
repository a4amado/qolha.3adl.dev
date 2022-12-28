import { Form, Row, Button, Input, notification } from "antd";
import PageContainer from "../../../components/PageContainer";
import { Formik, Field, FieldConfig } from "formik";
import Header from "../../../components/header";
import * as yup from "yup";
import axios from "axios";

const FeildConf = (v: FieldConfig) => v;

export default function Page() {
  const initialValues = { email: "", password: "" };
  async function handleLogin(e: typeof initialValues) {
    try {
      await axios({
        method: "POST",
        url: "/api/admin/auth",
        data: {
          email: e.email,
          password: e.password,
        },
      });
      window.location.replace("/dashboard/users");
    } catch (error) {
      notification["error"]({
        message: "Something went wrong",
      });
    }
  }
  return (
    <>
      <Header isSearch={false} />
      <PageContainer>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
          validationSchema={yup.object().shape({
            email: yup.string().email(),
            password: yup.string().required(),
          })}
        >
          {(props) => (
            <Form>
              <Row>
                <Field
                  {...FeildConf({
                    name: "email",
                    as: Input,
                  })}
                />
              </Row>
              <Row>
                <Field
                  {...FeildConf({
                    name: "password",
                    as: Input,
                    type: "password",
                  })}
                />
              </Row>
              <Row>
                <Button onClick={() => props.handleSubmit()}>s</Button>
              </Row>
            </Form>
          )}
        </Formik>
      </PageContainer>{" "}
    </>
  );
}
