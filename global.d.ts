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
            NEXTAUTH_SECRET: string;
            DISCORD_CLIENT_ID: string;
            GOOGLE_CLIENT_ID: string;
            DISCORD_CLIENT_SECRET: string;
            GOOGLE_CLIENT_SECRET: string;
        }
    }
}
