import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

import {auth} from '@/auth';
import { redirect } from "next/navigation";
import CredentialsSignInForm from "../(auth)/sign-in/credentials-signin-form";
export const metadata: Metadata = {
    title: 'Dashboard'
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
                <CardTitle className="text-center text-3xl my-4">
                  Sign In
                </CardTitle>
                <CardDescription className="text-center">Please sign in to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <CredentialsSignInForm />
            </CardContent>
        </Card>
    </div> ;
}
 
export default DashboardPage ;