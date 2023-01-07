import * as LabelRadix from "@radix-ui/react-label";

export const Label = ({ children, className, htmlFor }) => {
  return (
    <LabelRadix.Root className={className} htmlFor={htmlFor}>
      {children}
    </LabelRadix.Root>
  );
};
