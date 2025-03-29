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

const Menu = async () => {
    const cart = await getMyCart();

    return <div className="flex justify-end gap-3">
        <nav className="hidden md:flex w-full max-w xs gap-1">
        <ModeToggle />
        <CartCount cart={cart} />
        <UserButton/>
        </nav>
        <nav className="md:hidden">
        <Sheet>
            <SheetTrigger className='align-middle'>
                <AlignJustify/>
            </SheetTrigger>
            <SheetContent className='flex flex-col items-start'>
            <SheetTitle>Menu</SheetTitle>
                <ModeToggle />
                <CartCount cart={cart} />
                <UserButton />
            <SheetDescription></SheetDescription>
            </SheetContent>
        </Sheet>
        </nav>
    </div>;
}
 
export default Menu;