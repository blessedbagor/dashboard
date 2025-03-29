import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

import {auth} from '@/auth';
import { redirect } from "next/navigation";
import CredentialsSignInForm from "../(auth)/sign-in/credentials-signin-form";
export const metadata: Metadata = {
    title: 'Sign In'
};


const DashboardPage = async (props: {
    searchParams: Promise<{
        callbackUrl: string
    }>
}) => {
    const {callbackUrl} = await props.searchParams;

    const session = await auth();

    if (session) {
        if (session.user.role === 'admin') {
            return redirect(callbackUrl || '/admin');
        } else if (session.user.role === 'user') {
            return redirect(callbackUrl || '/my-account');
        }
    }
    

    return <div className="w-full max-w-md mx-auto">
        <Card>
            <CardHeader  className="space-y-4">
                <Link href="/" className="flex-center" >
                <Image 
                src="/images/logo.svg" 
                width={80} 
                height={80} 
                alt={`${APP_NAME} logo`} 
                priority={true} 
                />
                </Link>
                <CardTitle className="text-center">Sign In</CardTitle>
                <CardDescription className="text-center">Please sign in to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <CredentialsSignInForm />
            </CardContent>
        </Card>
    </div> ;
}
 
export default DashboardPage ;