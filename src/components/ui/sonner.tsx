/** @format */

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <div>
      <Sonner
        theme={theme as ToasterProps["theme"]}
        className="toaster group"
        toastOptions={{
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-white group-[.toaster]:text-zinc-950 group-[.toaster]:border-zinc-200 group-[.toaster]:shadow-lg",
            description:
              "group-[.toast]:text-zinc-500 dark:group-[.toast]:text-zinc-400",
            actionButton:
              "group-[.toast]:bg-zinc-900 group-[.toast]:text-zinc-50",
            cancelButton:
              "group-[.toast]:bg-zinc-100 group-[.toast]:text-zinc-500",
          },
        }}
        {...props}
      />
    </div>
  );
};

export { Toaster };
