import { GetUserWorkflowsAction } from "@/actions/workflows/get-user-workflows";
import SectionLayout from "@/components/layouts/section-layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Inbox, Workflow } from "lucide-react";
import { Suspense } from "react";
import CreateWorkflow from "./_components/create-workflow";
import WorkflowCard from "./_components/card/workflow-card";

const WorkflowsPage = () => {
  return (
    <SectionLayout
      title="Workflows"
      subTitle="Manage your workflows"
      button={<CreateWorkflow />}
    >
      <Suspense fallback={<UserWorkflowSkeleton />}>
        <UserWorkflows />
      </Suspense>
    </SectionLayout>
  );
};

const UserWorkflowSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
};

const UserWorkflows = async () => {
  const workflows = await GetUserWorkflowsAction();
  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong!</AlertDescription>
      </Alert>
    );
  }
  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <Inbox size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold"> No Workflows created yet!</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first workflow
          </p>
        </div>
        <CreateWorkflow />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
};

export default WorkflowsPage;
