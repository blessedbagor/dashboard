import Link from 'next/link';
import {auth} from '@/auth';
import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
 } from '@/components/ui/dropdown-menu';
import { Power, UserIcon} from "lucide-react";

const UserButton = async () => {
    const session = await auth();

    if (!session) {
        return (
            <Button asChild className='ml-2 text-black dark:text-black bg-yellow-400 hover:bg-yellow-300 border-none rounded-xl' variant='outline'>
                <Link href='/sign-in'>
                <UserIcon size={64} /> Sign In
                </Link>
            </Button>
        )
    }

        const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

    return (<div className="flex gap-2 items-center">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center">
                    <Button variant='ghost' className='relativee w-8 h-8 rounded-full mx-2 flex items-center
                    justify center bg-yellow-400'
                    >
                        
                        {firstInitial}
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align="end" forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className="flex flex-col space-y-1">
                        <div className="text-sm font-medium leading-none">
                            {session.user?.name}
                        </div>
                        <div className="text-sm font-light leading-none">
                            {session.user?.email}
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuItem>
                    <Link href='/my-account' className='w-full'>
                    My Account
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Link href='/my-account/orders' className='w-full'>
                    Orders
                    </Link>
                </DropdownMenuItem>

                {session?.user?.role === 'admin' && (
                <DropdownMenuItem>
                    <Link href='/admin' className='w-full'>
                    Admin Dashboard
                    </Link>
                </DropdownMenuItem>
                )}

                <DropdownMenuItem className="p-0 mb-1">
                    <form action={signOutUser} className='w-full'>
                        <Button className='w-full py-4 px-2 h-4 justify-start' variant='ghost'>
                        <Power /> Signout
                        </Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div> 
    );
}
 
export default UserButton ;