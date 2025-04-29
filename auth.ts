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
                    const isMatch = await compareSync(
                        credentials.password as string,
                        user.password
                    );

                    // const isMatch = () => { return user.password === credentials.password };

                    // console.log('Input pass', user.password);
                    // console.log('credentials pass', credentials.password);

                    // If password is correct, return user
                    // console.log('--- isMatch', isMatch);
                    if (isMatch) {
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
        async jwt({ token, user, trigger, session }: any) {
            // Assign user fields to token
            if (user) {
                // console.log('jwt-token', JSON.stringify(token));
                // console.log('jwt-User', JSON.stringify(user));

                // token.id = user.id;
                token.role = user.role;

                // If user is not null, set the user ID in the token
                if (user.name === 'NO_NAME') {
                    token.name = user.email!.split('@')[0];

                    // Update database to reflect the token name
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { name: token.name },
                    });
                }
            }
            return token;
        }, async session({ session, user, trigger, token }: any) {



            //  Set the user ID from the token
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;

            // console.log('session-token', JSON.stringify(token));
            // console.log('session-User', JSON.stringify(user));

            // If there is an update, set the user name
            if (trigger === 'update') {
                session.user.name = user.name;
            }

            return session;
        }
    }
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

