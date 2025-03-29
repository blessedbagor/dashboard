import { cn } from "@/lib/utils";

const ProductPrice = ({ value, className }: { value: number; className?: string }) => {
  // Ensure two decimal places
  const stringValue = value.toFixed(2);
  // Get the int/float
  const [intValue, floatValue] = stringValue.split(".");

  // Format the intValue with a thousands separator
  const formattedIntValue = new Intl.NumberFormat().format(Number(intValue));

  return (
    <p className={cn("text-2xl", className)}>
      <span className="text-xs align-super">$</span>
      {formattedIntValue}
      <span className="text-xs align-super">.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
