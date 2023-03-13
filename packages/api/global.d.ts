declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            PORT?: string;
            ALGO_API_ID: string;
            ALOG_SEARCH_ONLY_KEY: string;
            DATABASE_URL: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_SECRET: string;
            MAILERSEND: string;
            CLOUDINARY_CLOUD_NAME: string;
            CLOUDINARY_API_KEY: string;
            CLOUDINARY_API_SECRET: string;
        }
    }
}

export {};
