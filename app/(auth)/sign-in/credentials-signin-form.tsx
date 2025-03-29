'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import { AtSign, Key } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import {useSearchParams} from 'next/navigation';

const CredentialsSignInForm = () => {
    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: ''
    });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const SignInButton = () => {
        const {pending} = useFormStatus();

    return (
        <Button disabled={pending} className="w-full" variant="default">
            {pending ? 'Signing In...' : 'Sign In'}
        </Button>
    )
}
    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <AtSign className="absolute top-1/2 left-3 -translate-y-1/2 text-yellow-500 h-[18px] w-[18px]" />
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            defaultValue={signInDefaultValues.email}
                            className="pl-10" // Adjust padding for the icon
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Key className="absolute top-1/2 left-3 -translate-y-1/2 text-yellow-500 h-[18px] w-[18px]"/>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="password"
                            defaultValue={signInDefaultValues.password}
                            className="pl-10" // Adjust padding for the icon
                        />
                    </div>
                </div>
                <div>
                    <SignInButton />

                    {data && !data.success && (
                        <div className="text-center text-destructive p-2">
                            {data.message}
                        </div>
                    )}


                </div>
                <div className="text-sm text-center text-muted-foreground">
                    Don&apos;t have an account? {''}
                    <Link href="/sign-up/" target="_self" className="link text-yellow-500">
                        Sign Up
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default CredentialsSignInForm;
