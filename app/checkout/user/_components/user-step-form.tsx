"use client";

import { Label } from "@/components/ui/label";
import { useMultiStep } from "../../_components/multi-step-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const userStepSchema = z.object({
  name: z.string().min(1),
});

export type UserStepValues = z.infer<typeof userStepSchema>;

export function UserStepForm() {
  const { state, updateState, goTo } = useMultiStep();
  const form = useForm<UserStepValues>({
    defaultValues: state.user,
    resolver: zodResolver(userStepSchema),
  });
  const onSubmit = (user: UserStepValues) => {
    updateState({ user });
    goTo("location");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Navnet ditt <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="navn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button>Next</Button>
        </div>
      </form>
    </Form>
  );
}
