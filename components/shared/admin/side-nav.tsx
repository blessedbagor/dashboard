import { PowerIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { signOutUser } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NavLink from "@/components/shared/admin/nav-link";

const SideNav = async () => {
    const session = await auth();

    if (!session) {
        redirect('/')
    }
    return (
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
          className="mb-2 flex h-20 justify-center items-center rounded-md bg-gray-950  dark:bg-gray-800 p-2 md:h-20"
          href="/"
        >
        <div className="flex items-center space-x-4">
            <Image 
                src="/images/logo.svg" 
                alt={`${APP_NAME} logo`} 
                height={45}
                width={45}
                priority={true}
            />
            <h2 className="text-xl text-white dark:text-gray-200">ADMIN</h2>
        </div>

        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLink />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-gray-800 md:block"></div>
          <form action={signOutUser}>
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-600 dark:hover:text-yellow-400 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
    );
  }

  export default SideNav;