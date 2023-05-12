import * as yup from "yup";
import { AllowedSocialMedia } from "@ui/UserDetails";

const Schema$API$InsertSocialMedia = yup.object().shape({
    body: yup.object({
        site: yup.string().required().oneOf(AllowedSocialMedia),
        username: yup.string().required(),
    }),
});

const Schema$Client$InsertSocialMedia = yup.object().shape({
    site: yup.string().required().oneOf(AllowedSocialMedia),
    username: yup.string().required(),
});

export { Schema$API$InsertSocialMedia, Schema$Client$InsertSocialMedia };
