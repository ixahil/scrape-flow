import Logo from "@/components/shared/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const WorkflowLayout = (props: Props) => {
  return (
    <div className="flex flex-col w-full h-screen">
      {props.children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />
        <ThemeToggle />
      </footer>
    </div>
  );
};

export default WorkflowLayout;
