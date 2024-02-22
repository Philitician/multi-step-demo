"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMultiStep } from "../../_components/multi-step-provider";

export const locationStepSchema = z.object({
  address: z.string(),
});

export type LocationStepValues = z.infer<typeof locationStepSchema>;

export function LocationStepForm() {
  const { state, updateState, goTo } = useMultiStep();
  const form = useForm<LocationStepValues>({
    defaultValues: state.location,
    resolver: zodResolver(locationStepSchema),
  });
  const onSubmit = async (location: LocationStepValues) => {
    updateState({ location });
    goTo("delivery");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Lokasjon <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="lokasjon..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="button" onClick={() => goTo("user")}>
            Tilbake
          </Button>
          <Button>Fullfør</Button>
        </div>
      </form>
    </Form>
  );
}
