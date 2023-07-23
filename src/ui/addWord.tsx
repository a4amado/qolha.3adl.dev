import { Input, FormControl, InputLabel, FormHelperText, Button, TextField } from "@mui/material";
import { InferType } from "yup";
import * as yup from "yup";

const g = yup.object().shape({
    word: yup.string().required(),
});

import { Formik, Field, Form } from "formik";
import { ChangeEvent } from "react";
import { trpc } from "@utils/trpc";

export default function AddWord() {
    const appendWord = trpc.word.insertWord.useMutation();

    return (
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
                <Form className="max-w-4xl flex flex-col gap-2 mx-auto my-3 h-auto">
                    <Field as={TextField} onChange={(e: ChangeEvent) => form.handleChange(e)} value={form.values.word} name="word" id="text-input" placeholder="Word" />
                    <div className="m-auto">
                        <Button className="bg-blue-500 hover:bg-blue-600" variant="contained" title="Add Word" onClick={() => form.handleSubmit()} type="submit">
                            Add Word
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
