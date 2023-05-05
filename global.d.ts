export {};

type file = {
    mimetype: String;
    mtime: String;
    newFilename: String;
    originalFilename: String;
    size: number;
};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            NODE_ENV: "development" | "production";
            MAILERSEND: string;
            DB_URL: string;
        }
    }
}
