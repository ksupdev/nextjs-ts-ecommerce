'use server';

import { signInFormSchema, signUpFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/db/prisma";
import { formatError } from "@/lib/utils";

// Sign in the user with credentials
export async function signInWithCredentials(prevState: unknown, formDat: FormData) {
    try {
        const user = signInFormSchema.parse({
            email: formDat.get('email'),
            password: formDat.get('password'),
        });

        await signIn('credentials', user);

        return { success: true, message: 'Signed in successfully' };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        return { success: false, message: 'Invalid email or password' };
    }
}

// Sign user out
export async function signOutUser() {
    await signOut();
}

// Sign up the user
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        const plainPassword = user.password;

        user.password = hashSync(user.password, 10);
        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        });

        await signIn('credentials', {
            email: user.email,
            password: plainPassword,
        });
        return { success: true, message: 'User registered successfully' };

    } catch (error) {

        if (isRedirectError(error)) {
            throw error;
        }

        return { success: false, message: formatError(error) };

    }
}



// function logErrorType(error: unknown): void {
//     console.log('ประเภทของข้อผิดพลาด (typeof):', typeof error);

//     // ตรวจสอบประเภทของข้อผิดพลาด
//     const errorTypes = [
//         { name: 'Error', check: error instanceof Error },
//         { name: 'TypeError', check: error instanceof TypeError },
//         { name: 'SyntaxError', check: error instanceof SyntaxError },
//         { name: 'RangeError', check: error instanceof RangeError },
//         { name: 'ZodError', check: error instanceof z.ZodError },
//         // เพิ่มประเภทข้อผิดพลาดอื่นๆ ตามต้องการ
//     ];

//     const matchedTypes = errorTypes
//         .filter(type => type.check)
//         .map(type => type.name);

//     if (matchedTypes.length > 0) {
//         console.log('error instanceof:', matchedTypes.join(', '));
//     } else {
//         console.log('error ไม่ใช่ instance ของคลาสข้อผิดพลาดใดๆ ที่ตรวจสอบ');
//     }

//     // แสดงข้อมูลของข้อผิดพลาด
//     console.log('ข้อมูลข้อผิดพลาด:', error);
// }