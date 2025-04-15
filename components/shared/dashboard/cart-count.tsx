import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Cart } from "@/types";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const CartCount = ({ cart }: { cart?: Cart }) => {
    return (
        <>
            {/* If no cart or no items in cart */}
            {!cart || cart.items.length === 0 ? (
                <Button asChild variant="ghost" className="rounded-3xl hover:bg-yellow-400">
                    <Link href="/cart">
                    <ShoppingBag size={64}  />
                    </Link>
                </Button>
            ) : (
                <Button asChild variant="ghost" className="rounded-3xl hover:bg-yellow-400">
                    <Link href="/cart" className="relative flex items-center gap-2">
                        <div className="relative">
                            <ShoppingBag size={64} />
                            <span className="absolute -top-4 -right-3 bg-yellow-400 text-black rounded-full text-xs font-bold w-4 h-4 flex items-center justify-center">
                                {cart.items.reduce((a, c) => a + c.qty, 0)}
                            </span>
                        </div>
                        <span>{formatCurrency(cart.itemsPrice)}</span>
                    </Link>
                </Button>
            )}
        </>
    );
};

export default CartCount;
