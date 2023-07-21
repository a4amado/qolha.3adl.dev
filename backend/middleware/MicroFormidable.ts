import { Fields, Files, Options, Formidable, File } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

type SingleFile = Exclude<File, File[] | undefined>;
type MultiFile = {
    [k: string]: "single" | "multi";
};

class MicroFormidable extends Formidable {
    constructor(...q: Options[]) {
        super(...q);
    }

    single(fieldName: string) {
        return (req: NextApiRequest & { [fieldNames: string]: SingleFile }, res: NextApiResponse, next: any) => {
            return this.parse(req, (err, fields: Fields, files: Files) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Error uploading file." });
                    return;
                }

                const file = files[fieldName];

                if (typeof file === "undefined") {
                    return res.status(500).json({ error: `file ${fieldName} is required` });
                }

                // @ts-ignore
                if (file?.length > 1) {
                    return res.status(500).json({ error: `file ${fieldName} should only be one file` });
                }

                // @ts-ignore
                req[fieldName] = file;

                return next();
            });
        };
    }
}

export default MicroFormidable;
