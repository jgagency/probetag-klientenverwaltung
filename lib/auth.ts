import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { username } from "better-auth/plugins";

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    emailAndPassword: { enabled: true },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: [process.env.FRONTEND_URL!],
    plugins: [username()],
    user: { changeEmail: {
            enabled: true,
            updateEmailWithoutVerification: true
        }
    },

});