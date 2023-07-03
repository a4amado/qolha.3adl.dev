import * as yup from "yup";

const Schema$verifyAccount = yup.object({
    userID: yup.string().uuid().required(),
    code: yup.string().uuid().required(),
});

export default Schema$verifyAccount;
