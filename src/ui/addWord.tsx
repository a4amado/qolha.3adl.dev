import { Button, Label, Input, shorthands, makeStyles, Field } from "@fluentui/react-components";

import { InferType } from "yup";
import * as yup from "yup";

import { Formik, Form } from "formik";
import { ChangeEvent } from "react";

import { trpc } from "@utils/trpc";
import { useSnackbar } from "notistack";

const g = yup.object().shape({
    word: yup.string().required(),
});

const useStyles = makeStyles({
    root: {
        ...shorthands.gap("10px"),
        display: "flex",
        flexDirection: "column",
        marginRight: "auto",
        marginLeft: "auto",
    },
});

export default function AddWord() {
    const appendWord = trpc.word.insertWord.useMutation();

    const snakbar = useSnackbar();

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
                <Form className={useStyles().root}>
                    <div className="m-auto">
                        <Button type="submit" size="large">
                            Add Word
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
