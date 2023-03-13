import * as yup from "yup";

const signUp = yup.object().shape({
    body: yup.object({
        username: yup.string().required().min(4),
        password: yup.string().min(10).required(),
        vPassword: yup
            .string()
            .oneOf([yup.ref("password")], "passwords does not match")
            .required(),
        email: yup.string().email().required(),
    })
});

const signIn = yup.object().shape({
    body: yup.object({
        email: yup.string().email().required(),
        password: yup.string().required().min(10),
    })
});

const QueryWord = yup.object().shape({
    query: yup.object({
        wordID: yup.string().required().uuid(),
    })
});

const appendWord = yup.object().shape({
    body: yup.object({
        word: yup.string().required()
    })
});


const listClipsForWord = yup.object().shape({
    query: yup.object({
        wordID: yup.string().required().uuid(),
    })
});

const appendClipToWord = yup.object().shape({
    query: yup.object({
        wordID: yup.string().required().uuid(),
    })
});



const streamClip = yup.object().shape({
    query: yup.object({
        clipID: yup.string().uuid().required(),
    })
});



const acceptOrRejectClip = yup.object().shape({
    query: yup.object({
        clipID: yup.string().uuid().required(),
    })
})

const appendRate = yup.object().shape({
    query: yup.object().shape({
        clipID: yup.string().uuid(),
    }),
    body: yup.object().shape({
        rate: yup.string().oneOf(["0", "50", "100"]),
    }),
});


const getOrDeleteUser = yup.object().shape({
    query: yup.object({
        userID: yup.string().required().uuid(),
    })
});


const getOrDeleteClip = yup.object().shape({
    query: yup.object({
        clipID: yup.string().required().uuid(),
    })
});


const schema = {
    signIn, signUp, QueryWord, appendWord, listClipsForWord, appendClipToWord, streamClip, acceptOrRejectClip,
    appendRate, getOrDeleteUser, getOrDeleteClip
};

export type schemaName = keyof typeof schema;

export default schema;
