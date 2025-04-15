import ModeToggle from "./mode-toggle";
import { 
    AlignJustify
} from "lucide-react";
import { 
    Sheet, 
    SheetContent, 
    SheetDescription, 
    SheetTitle, 
    SheetTrigger 
} from "@/components/ui/sheet";
import UserButton from "./user-button";
import CartCount from "./cart-count";
import { getMyCart } from "@/lib/actions/cart.actions";
import Link from "next/link";

const navItems = [
    {name: "Dashboard", href: "/dashboard"},
    {name: "Share", href: "/dashboard/share"},
    {name: "Orders", href: "/dashboard/orders"},
    
];

const Menu = async () => {
    const cart = await getMyCart();

    return <div className="flex justify-end gap-3">
        <nav className="hidden xl:flex w-full max-w xs gap-1">
        {navItems.map((item)=>(
            <Link
                key={item.name}
                href={item.href}
                className="rounded-xl hover:bg-yellow-400 hover:text-black px-4 py-2 text-sm uppercase font-medium"
            >
                {item.name}
            </Link>
        ))}

        <ModeToggle />
        <CartCount cart={cart} />
        <UserButton/>
        </nav>
        <nav className="xl:hidden">
        <Sheet>
            <SheetTrigger className='align-middle'>
                <AlignJustify/>
            </SheetTrigger>
            <SheetContent className='flex flex-col items-start'>
            <SheetTitle>Menu</SheetTitle>
            <CartCount cart={cart} />
            {navItems.map((item)=>(
                    <Link
                        key={item.name}
                        href={item.href}
                        className="rounded-xl hover:bg-yellow-400 hover:text-black px-4 py-2 text-sm uppercase font-medium"
                    >
                        {item.name}
                    </Link>
                ))}
                <ModeToggle />
                <UserButton />
                
            <SheetDescription></SheetDescription>
            </SheetContent>
        </Sheet>
        </nav>
    </div>;
}
 
export default Menu;