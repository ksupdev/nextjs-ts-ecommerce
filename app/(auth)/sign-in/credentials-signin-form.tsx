'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signInDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

//sfc
const CredentialsSignInForm = () => {
    return <form>
        <div className='space-y-6'>
            <div>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' name='email' type='email' autoComplete={signInDefaultValues.email} required />
            </div>
            <div>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' name='password' type='password' autoComplete={signInDefaultValues.password} required />
            </div>
            <div>
                <Button className='w-full' variant='default' >Sign In</Button>
            </div>
            <div className="text-sm text-center text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href='/sign-up' target='_self' className="text-blue-500 hover:text-blue-700">
                    Sign Up
                </Link>
            </div>
        </div>
    </form>;
}

export default CredentialsSignInForm;