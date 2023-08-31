import { Button, Input, Form, Space, message } from "antd"; // Import Ant Design components
import { Field, Formik } from "formik";
import { trpc } from "@utils/trpc";
import * as yup from "yup";

const schema = yup.object().shape({
    word: yup.string().required("This field is required"),
});

export default function AddWord() {
    const appendWord = trpc.word.insertWord.useMutation({
        onError(error) {
            message.error(error.message);
        },
        onSuccess(data) {
            message.success(`Word Added: ${data.ar}`);
        },
        retry: false,
    });

    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                word: "",
            }}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                if (appendWord.isLoading) return;

                await appendWord.mutateAsync(values);

                actions.resetForm();
            }}
        >
            {(formik) => (
                <Form className="w-full max-w-md mx-auto my-3 space-y-2">
                    <Field name="word">
                        {({ field, meta }: any) => (
                            <div>
                                <Input {...field} id="word" placeholder="Word" />
                                {meta.touched && meta.error && <div className="text-red-500">{meta.error}</div>}
                            </div>
                        )}
                    </Field>
                    <Space align="center">
                        <Button type="primary" loading={appendWord.isLoading} onClick={formik.handleSubmit}>
                            Add Word
                        </Button>
                    </Space>
                </Form>
            )}
        </Formik>
    );
}
