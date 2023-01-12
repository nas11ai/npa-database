import * as AvatarRadix from "@radix-ui/react-avatar";
import classNames from "classnames";

export const Avatar = ({
  src = "",
  alt = "",
  fallback = "",
  delayMs = 600,
}) => {
  return (
    <AvatarRadix.Root
      className={classNames(
        "flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full border-1 align-middle",
        {
          "border-npa-neutral-300": src === "",
        }
      )}
    >
      <AvatarRadix.Image
        className="h-full w-full object-cover"
        src={src}
        alt={alt}
      />
      <AvatarRadix.Fallback
        className="flex h-full w-full items-center justify-center"
        delayMs={delayMs}
      >
        {fallback}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  );
};
