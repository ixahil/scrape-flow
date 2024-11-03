import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormControls } from "@/types/forms";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";

type Props = {
  form: UseFormReturn<any>;
  formControls: FormControls[];
  onSubmit: (data?: any) => void;
};

export const CommonForm = ({ form, formControls, onSubmit }: Props) => {
  return (
    <Form {...form}>
      <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        {formControls?.map((control: FormControls) => (
          <FormElemRenderer key={control.name} element={control} />
        ))}
        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Proceed"
          )}
        </Button>
      </form>
    </Form>
  );
};

const FormElemRenderer = ({ element }: { element: FormControls }) => {
  const form = useFormContext();
  const { name, label, type, componentType, required, placeholder } = element;

  console.log(required);

  switch (componentType) {
    case "input":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1 items-center">
                {label}
                <span
                  className={cn(
                    "text-xs",
                    required ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {required ? "(Required)" : "(Optional)"}
                </span>
              </FormLabel>
              <FormControl>
                <Input {...field} type={type} placeholder={placeholder} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "textarea":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex gap-1 items-center">
                {label}
                <p
                  className={cn(
                    "text-xs",
                    required ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {required ? "(Required)" : "(Optional)"}
                </p>
              </FormLabel>
              <FormControl>
                <Textarea {...field} placeholder={placeholder} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    default:
      return <p>default</p>;
  }
};
