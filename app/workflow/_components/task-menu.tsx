"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/register";
import { TaskType } from "@/types/task";
import React from "react";

type Props = {};

const TaskMenu = (props: Props) => {
  return (
    <aside
      className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-2 overflow-auto"
      onDrop={(e) => e.preventDefault()}
    >
      <Accordion
        type="multiple"
        className="w-full overflow-auto"
        defaultValue={["extraction"]}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data Extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuButton taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

type TaskMenuButtonProps = {
  taskType: TaskType;
};

const TaskMenuButton = ({ taskType }: TaskMenuButtonProps) => {
  const task = TaskRegistry[taskType];

  const handleDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant={"secondary"}
      className="flex justify-between items-center gap-2 border w-full"
      draggable
      onDragStart={(event) => handleDragStart(event, taskType)}
    >
      <div className="flex gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
};

export default TaskMenu;
