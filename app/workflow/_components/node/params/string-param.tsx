"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/appNode";
import { ReactEventHandler, useId, useState } from "react";

const StringParam = ({ param, value, update }: ParamProps) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const id = useId();

  // Update value on Input change - Internal Value
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
  };

  // Persist value on Blur
  const handleOnBlur = () => {
    update(internalValue);
  };

  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-500 px-1">*</p>}
      </Label>
      <Input
        className="text-xs"
        id={id}
        value={internalValue}
        placeholder="Enter value"
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
      {param.helperText && (
        <div className="text-muted-foreground px-2">{param.helperText}</div>
      )}
    </div>
  );
};

export default StringParam;
