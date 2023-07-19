import { Alert, Alignment, FormGroup, InputGroup } from "@blueprintjs/core";
import { InferType } from "yup";
import * as yup from "yup";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Button } from "@blueprintjs/core";
const g = yup.object().shape({
    word: yup.string().required(),
});

import { Formik, Field, Form } from "formik";
import { ChangeEvent, useEffect } from "react";
import { trpc } from "@utils/trpc";
import Header from "@ui/header";
import PageContainer from "@ui/PageContainer";

export default function Page() {
    const appendWord = trpc.word.insertWord.useMutation();

    return (
        <>
            <Header isSearch={false} />
            <PageContainer>
                <Formik
                    validationSchema={g}
                    initialValues={{ word: "" } as InferType<typeof g>}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        await appendWord.mutateAsync(values);
                        actions.resetForm();
                    }}
                >
                    {(form) => (
                        <Form className="max-w-4xl mx-auto my-3 h-auto">
                            <FormGroup helperText="Input Word" label="Word" labelFor="text-input" labelInfo="(Required)">
                                <Field className="text-center" as={InputGroup} onChange={(e: ChangeEvent) => form.handleChange(e)} value={form.values.word} name="word" id="text-input" placeholder="Word" />
                            </FormGroup>

                            <div className="m-auto">
                                <Button icon="send-message" name="description" title="Add Word" onClick={() => form.handleSubmit()} type="submit" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </PageContainer>
        </>
    );
}
