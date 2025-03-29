import { Metadata } from "next";
import { deleteMember, getAllMembers } from "@/lib/actions/user.actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/shared/delete-dialog";
import Link from "next/link";
import { formatId } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: 'Admin Members'
};

const AdminMemberPage = async(props: {
    searchParams: Promise<{
        page: string;
    }>
}) => {
    const {page = '1'} = await props.searchParams;
    const members = await getAllMembers({page: Number(page)});

    return <div className="space-y-4">
    <div className="flex">
        <h1 className="h2-bold mr-4">Members</h1>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead className="text-center">EMAIL</TableHead>
                <TableHead className="text-center">ROLE</TableHead>
                <TableHead className="w-[100px] text-center">ACTIONS</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                members.data.map((member) => (
                    <TableRow key={member.id}>
                        <TableCell>{formatId(member.id)}</TableCell>
                        <TableCell>{member.name}</TableCell>
                        <TableCell className="text-center">{member.email}</TableCell>
                        <TableCell className="text-center">
                            {member.role === 'user' ? (
                                <Badge variant='secondary'>User</Badge>
                            ) : (<Badge variant='default'>Admin</Badge>)}
                        </TableCell>
                        <TableCell className="flex">
                            <Button asChild variant='ghost' className="hover:bg-transparent">
                                <Link href={`/admin/member/${member.id}`}>
                                <PencilIcon />
                                </Link>
                            </Button>
                            <DeleteDialog id={member.id} action={deleteMember} />
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
    {members.totalPages > 1 && (
        <Pagination page={page} totalPages={members.totalPages} />
    )}
    </div>;
}
export default AdminMemberPage;