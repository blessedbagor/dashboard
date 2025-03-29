import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import UserMobileMenu from "./mobile-menu";



const UserMobileNav = () => {
    return <div className="block md:hidden bg-gray-950  dark:bg-gray-800"> <header className="w-full border-b">
    <div className="wrapper flex items-center justify-between">
      {/* Logo Section */}
      <Link href="/my-account" className="flex items-center">
        <Image 
          src="/images/logo.svg" 
          alt={`${APP_NAME} logo`} 
          height={48}
          width={48}
          priority={true}
        />
        <p className='text-xl mx-4 text-white'>MY ACCOUNT</p>
      </Link>
  
        {/* Search in the center */}
        <div className="flex-1 flex justify-center">

        </div>
  
      {/* Menu on the right */}
      <div className="flex items-center">
        <UserMobileMenu />
      </div>
    </div>
  </header>
  </div> 
}
 
export default UserMobileNav;