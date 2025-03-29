'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import { AtSign, Key, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";
import {useSearchParams} from 'next/navigation';

const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: ''
    });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const SignUpButton = () => {
        const {pending} = useFormStatus();

    return (
        <Button disabled={pending} className="w-full" variant="default">
            {pending ? 'Submitting...' : 'Sign Up'}
        </Button>
    )
}
    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
            <div>
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                        <UserRound className="absolute top-1/2 left-3 -translate-y-1/2 text-yellow-500 h-[18px] w-[18px]" />
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            defaultValue={signUpDefaultValues.name}
                            className="pl-10" // Adjust padding for the icon
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <AtSign className="absolute top-1/2 left-3 -translate-y-1/2 text-yellow-500 h-[18px] w-[18px]" />
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            defaultValue={signUpDefaultValues.email}
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
                            autoComplete="password"
                            defaultValue={signUpDefaultValues.password}
                            className="pl-10" // Adjust padding for the icon
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <ShieldCheck className="absolute top-1/2 left-3 -translate-y-1/2 text-yellow-500 h-[18px] w-[18px]"/>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="confirmPassword"
                            defaultValue={signUpDefaultValues.confirmPassword}
                            className="pl-10" // Adjust padding for the icon
                        />
                    </div>
                </div>
                <div>
                    <SignUpButton />

                    {data && !data.success && (
                        <div className="text-center text-destructive p-2">
                            {data.message}
                        </div>
                    )}


                </div>
                <div className="text-sm text-center text-muted-foreground">
                    Already have an account? {''}
                    <Link href="/sign-in/" target="_self" className="link text-yellow-500">
                        Sign In
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default SignUpForm;
