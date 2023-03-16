declare global {
    namespace Express {
        interface Request {
            user: {
                userID?: string;
                email?: string;
                role?: "admin" | "none";
            };
        }
    }
}
export {};
