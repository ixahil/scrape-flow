import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CustomDialogHeader from "./custom-dialog-header";
import { Layers2 } from "lucide-react";

type Props = {
  triggerText?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
};

const Modal = ({ triggerText, isOpen, setIsOpen, children }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Open"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2}
          title={"Create workflow"}
          subTitle={"Start building your workflow"}
        />
        <div className="p-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
