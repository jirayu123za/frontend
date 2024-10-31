import NextAuth from 'next-auth';
import axios from 'axios';
import { JWT } from "next-auth/jwt";
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions, ISODateString, User } from "next-auth";

export interface CustomSession {
    user?: CustomUser;
    expires: ISODateString;
}

export interface CustomUser {
    user_id?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    profile_image?: string | null;
    token?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                user_name: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post(
                        "http://localhost:8000/api/auth/login",
                        // "http://localhost:8000/api/auth/checkCredentials",
                        credentials
                    );

                    const user = res.data?.user;
                    if (user) {
                        console.log("User is", user);
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update" && session?.profile_image) {
                const user: CustomUser = token.user as CustomUser;
                user.profile_image = session?.profile_image;
                console.log("The token is", token);
            }
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({
            session,
            token,
            user,
        }: {
            session: CustomSession;
            token: JWT;
            user: User;
        }) {
            session.user = token.user as CustomUser;
            return session;
        },
    },
}
