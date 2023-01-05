import * as LabelRadix from "@radix-ui/react-label";

export default function Label({ children, className, htmlFor }) {
  return (
    <LabelRadix.Root className={className} htmlFor={htmlFor}>
      {children}
    </LabelRadix.Root>
  );
}
