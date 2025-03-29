import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import UpdateMemberForm from "./update-member-form";

export const metadata: Metadata = {
    title: 'Update Member'
};

const AdminUpdateMemberPage = async(props: {
    params: Promise<{
        id: string;
    }>
}) => {
    const {id} = await props.params;
    const member = await getUserById(id);

    if(!member) notFound();

    return <div className="space-y-8 max-w-lg">
        <h1 className="h2-bold">Update Member</h1>
        <UpdateMemberForm member={member} />
    </div>;
}
 
export default AdminUpdateMemberPage;