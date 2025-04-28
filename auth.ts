import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts";

export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
    },
    session: {
        strategy: 'jwt' as const,
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                if (credentials == null) return null;



                // Find user in database
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string,
                    },
                });

                console.log('Get user', JSON.stringify(user));
                // Check if user exists and if the password matches
                if (user && user.password) {
                    // const isMatch = await compareSync(
                    //     credentials.password as string,
                    //     user.password
                    // );

                    const isMatch = () => { return user.password === credentials.password };

                    // console.log('Input pass', user.password);
                    // console.log('credentials pass', credentials.password);

                    // If password is correct, return user
                    // console.log('--- isMatch', isMatch);
                    if (isMatch()) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        };
                    } else {
                        console.log('--- Password does not match');
                        throw new Error('Password does not match');
                    }
                }
                // If user does not exist or password does not match return null
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, user, trigger, token }: any) {
            // console.log('--- session', session);

            //  Set the user ID from the token
            session.user.id = token.sub;

            // if there is an update, set the user name
            if (trigger === 'update') {
                session.user.name = user.name;
            }
            return session;
        },
    }
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

