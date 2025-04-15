import { Metadata } from "next";
import ShareList from "./share-list";
import { auth } from "@/auth";

export const metadata: Metadata = {
    title: 'Share Service',
};

const SharePage = async() => {
    const session = await auth();

    const userId = session?.user?.id;

    return ( <>
    <div className="space-y-2">
        <h2 className="h2-bold">Share</h2>
        <p className="py-2">You must be an activated distributor to use this service.</p>
    <ShareList userId={userId}/>
    </div>
    </> );
}
 
export default SharePage;