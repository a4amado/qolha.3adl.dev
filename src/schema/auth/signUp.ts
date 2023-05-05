import * as yup from "yup"


const Schema$API$SignUp = yup.object().shape({
    body: yup.object({
        email: yup.string().email().required(),
        username: yup.string().required(),
        password: yup.string().required().min(10),
        vPassword: yup
            .string()
            .required()
            .min(10)
            .oneOf([yup.ref("password")], "vPassword must equal the password"),
    })
});


const Schema$Client$SignUp = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().required().min(10),
    vPassword: yup
        .string()
        .required()
        .min(10)
        .oneOf([yup.ref("password")], "vPassword must equal the password"),
})


export {
    Schema$API$SignUp,
    Schema$Client$SignUp
}