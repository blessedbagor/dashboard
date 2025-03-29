'use client';

import clsx from "clsx";
import { 
    Box, 
    UserIcon, 
    Stethoscope, 
    Network,
    Presentation,
    Share2
    } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { 
        name: 'My Account', 
        href: '/my-account', 
        icon: UserIcon 
    },
    {
        name: 'Share',
        href: '/my-account/share',
        icon: Share2,
      },
    {
      name: 'Orders',
      href: '/my-account/orders',
      icon: Box,
    },
    { 
        name: 'Care', 
        href: 'https://care.igift.com.ph/wp-login.php?redirect_to=https%3A%2F%2Fcare.igift.com.ph%2Fwp-admin%2Fadmin.php%3Fpage%3Ddashboard&reauth=1#/', 
        icon: Stethoscope 
    },
    {
        name: 'Network',
        href: 'https://igiftmit.com',
        icon: Network
      },
      {
        name: 'Learn',
        href: 'https://learn.igift.com.ph/',
        icon: Presentation
      },
];

const NavLink = () => {
    const pathname = usePathname();

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                const isExternal = link.href.startsWith('http');

                return (
                    <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        "flex w-full h-[48px] lg:items-center items-start gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-md font-medium hover:bg-yellow-100 dark:hover:text-yellow-500 hover:text-yellow-600",
                        {
                        'bg-yellow-100 text-yellow-600 dark:text-yellow-500': pathname === link.href,
                        }
                    )}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    >
                    <LinkIcon className="w-6" />
                    <p >{link.name}</p>
                    </Link>

                );
            })}
        </>
    );
};

export default NavLink;
