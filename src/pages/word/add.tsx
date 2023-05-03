import isArabicString from "@backend/utils/isArabicString";
import PageContainer from "ui/PageContainer";
import Header from "ui/header";
import { Row, Col, Input, Button } from "antd";
import useAxios from "axios-hooks";

import { Formik, ErrorMessage, Field } from "formik";
import * as yup from "yup";

const AddWordSchema = yup.object().shape({
    word: yup.string().required(),
    description: yup.string().required(),
});

const intialValues = { word: "", description: "" };
export default function AddWord() {
    const [data, refetch] = useAxios({}, { manual: true });

    function submitWord(e: typeof intialValues) {
        return refetch({
            url: "/api/word",
            method: "POST",
            data: e,
        });
    }
    return (
        <>
            <Header isSearch={false} />
            <PageContainer>
                <Formik validateOnChange onSubmit={submitWord} initialValues={intialValues} validationSchema={AddWordSchema}>
                    {(formProps) => (
                        <Row className="w-full h-full">
                            <Col className="w-full">
                                <p>الكلمة العربيه</p>

                                <Field allowClear showCount name="word" as={Input} />
                                <ErrorMessage name="word" />
                            </Col>

                            <Col className="w-full">
                                <p>وصف</p>
                                <Field allowClear autoSize name="description" as={Input.TextArea} showCount />
                                <ErrorMessage name="description" />
                            </Col>
                            <Col className="w-full">ssss</Col>

                            <Col className="w-full">
                                <Button loading={formProps.isSubmitting} onClick={() => formProps.handleSubmit()}>
                                    ADD
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Formik>
            </PageContainer>
        </>
    );
}
