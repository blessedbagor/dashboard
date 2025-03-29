
import { 
    Sheet, 
    SheetContent, 
    SheetDescription, 
    SheetTitle, 
    SheetTrigger,
    SheetHeader
} from "@/components/ui/sheet";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import NavLink from "./nav-link";
import { signOutUser } from "@/lib/actions/user.actions";
import { PowerIcon } from "lucide-react";

const UserMobileMenu = async () => {
    const session = await auth();

    if (!session) redirect('/login');

    const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';

    return (
        <div className="flex justify-end gap-3">
            <nav>
                <Sheet>
                    <SheetTrigger className="align-middle">
                        <div className="flex items-center">
                            <Button 
                                variant="ghost" 
                                className="relative w-12 h-12 rounded-full mx-2 flex items-center justify-center bg-yellow-500"
                            >
                                <p className="text-lg">{firstInitial}</p>
                            </Button>
                        </div>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col items-start">
                        <SheetHeader>
                            <SheetTitle>Dashboard</SheetTitle>
                        </SheetHeader>

                        {/* User Info */}
                        <div className="grid grid-cols-[auto_1fr] gap-2 mb-4 items-center">
                            {/* Column 1: Button */}
                            <Button 
                                variant="ghost" 
                                className="relative w-10 h-10 rounded-full flex items-center justify-center bg-yellow-500"
                            >
                                <p className="text-lg">{firstInitial}</p>
                            </Button>

                            {/* Column 2: Name & Email */}
                            <div className="flex flex-col">
                                <div className="text-sm font-medium leading-none">
                                    {session.user?.name}
                                </div>
                                <div className="text-sm font-light leading-none">
                                    {session.user?.email}
                                </div>
                            </div>
                        </div>

                        <NavLink />

                        <form action={signOutUser}>
                        <button className="flex h-[48px] w-full grow items-start gap-2 rounded-md  dark:bg-gray-800 p-3 text-md font-medium hover:text-yellow-600 dark:hover:text-yellow-400">
                        <PowerIcon className="w-6" />
                        <div>Sign Out</div>
                        </button>
                        </form>

                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    );
};

export default UserMobileMenu;
