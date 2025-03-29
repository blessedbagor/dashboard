import { DollarSign, Headset, ShoppingBagIcon, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const IconBox = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="space-y-2 text-center">
      {icon}
      <div className="text-sm font-bold">{title}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  );
  

const IconBoxes = () => {
    return (
        <div className="flex items-center justify-center mt-8">
  <Card className="w-full max-w-7xl">
    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-2 md:p-8">
      <IconBox
        icon={<ShoppingBagIcon className="mx-auto w-10 h-10" />}
        title="Free Shipping"
        description="Free shipping on orders $75 & above."
      />
      <IconBox
        icon={<DollarSign className="mx-auto w-10 h-10" />}
        title="Earn Rewards"
        description="Enjoy up to 8 ways to earn."
      />
      <IconBox
        icon={<WalletCards className="mx-auto w-10 h-10" />}
        title="Flexible Payments"
        description="Pay with GCash, USDT or COD."
      />
      <IconBox
        icon={<Headset className="mx-auto w-10 h-10" />}
        title="24/7 Support"
        description="Get support at any time."
      />
    </CardContent>
  </Card>
</div>

      );
      
      
}
 
export default IconBoxes;