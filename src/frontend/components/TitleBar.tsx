import { cn } from "@frontend/lib/utils";
import { t } from "@shared/trpc/config";
import { MinusIcon, SquareIcon, XIcon } from "lucide-react";

import type { LucideIcon } from "lucide-react";

export function TitleBar(): JSX.Element {
  const { mutate: minimizeWindow } = t.window.minimize.useMutation();
  const { mutate: maximizeWindow } = t.window.maximize.useMutation();
  const { mutate: closeWindow } = t.window.closeWindow.useMutation();

  const buttons: (React.HTMLProps<HTMLDivElement> & {
    icon: LucideIcon;
    mutation: () => void;
  })[] = [
    { mutation: () => minimizeWindow(), icon: MinusIcon },
    { mutation: () => maximizeWindow(), icon: SquareIcon },
    {
      mutation: () => closeWindow(),
      icon: XIcon,
      className: "hover:text-destructive-foreground hover:bg-destructive",
    },
  ];

  return (
    <div className="flex w-full justify-end" id="drag">
      <div
        className="flex flex-row items-center gap-2 text-foreground-light"
        id="no-drag"
      >
        {buttons.map(({ className, mutation, icon: Icon, ...props }, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-row items-center gap-2 p-3 text-foreground-light hover:bg-muted",
              className,
            )}
            onClick={mutation}
            onKeyDown={mutation}
            {...props}
          >
            <Icon className="size-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
