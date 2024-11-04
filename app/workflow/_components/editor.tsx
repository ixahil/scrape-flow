"use client";
import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./flow-editor";
import Topbar from "./topbar/topbar";
import TaskMenu from "./task-menu";

type Props = {
  workflow: Workflow;
};

const Editor = (props: Props) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full overflow-hidden">
        <Topbar
          title="Workflow Editor"
          subTitle={props.workflow.name}
          workflowId={props.workflow.id}
        />
        <section className="flex h-full overflow-auto">
          <TaskMenu />
          <FlowEditor workflow={props.workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default Editor;
