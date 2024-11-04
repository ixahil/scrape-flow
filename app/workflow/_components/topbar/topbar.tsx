import TooltipWrapper from "@/components/shared/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import SaveButton from "./save-button";

type Props = {
  title: string;
  subTitle?: string;
  workflowId: string;
};

const Topbar = ({ title, subTitle, workflowId }: Props) => {
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button variant={"ghost"} size={"icon"} asChild>
            <Link href={"/"}>
              <ChevronLeft size={20} />
            </Link>
          </Button>
        </TooltipWrapper>
        <div className="">
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subTitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subTitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        <SaveButton workflowId={workflowId} />
      </div>
    </header>
  );
};

export default Topbar;
