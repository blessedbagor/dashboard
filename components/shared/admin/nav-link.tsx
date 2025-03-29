'use client';

import clsx from "clsx";
import { 
    Box, 
    LayoutDashboard,
    ShoppingBasket,
    Users 
    } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { 
        name: 'Overview', 
        href: '/admin', 
        icon: LayoutDashboard 
    },
    {
        name: 'Products',
        href: '/admin/products',
        icon: ShoppingBasket,
      },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: Box,
    },
    {
        name: 'Members',
        href: '/admin/members',
        icon: Users,
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
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-sm font-medium hover:bg-yellow-100 dark:hover:text-yellow-500 hover:text-yellow-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                'bg-yellow-100 text-yellow-600 dark:text-yellow-500': pathname === link.href,
                            }
                        )}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
};

export default NavLink;
