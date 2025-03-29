import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";


const Header = () => {
    return  <header className="w-full border-b">
    <div className="wrapper flex items-center justify-between">
      {/* Logo Section */}
      <Link href="/" className="flex items-center">
        <Image 
          src="/images/logo.svg" 
          alt={`${APP_NAME} logo`} 
          height={48}
          width={48}
          priority={true}
        />
      </Link>
  
      {/* Search in the center */}
      <div className="flex-1 flex justify-center">

      </div>
  
      {/* Menu on the right */}
      <div className="flex items-center">
        <Menu />
      </div>
    </div>
  </header>
  
}
 
export default Header;