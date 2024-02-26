"use client";

import { Button } from "@/components/ui/button";
import { useMultiStep } from "../../_components/multi-step-provider";

export function PaymentStepForm() {
  const { state, updateState, goTo } = useMultiStep();
  return (
    <Button type="button" onClick={() => goTo("delivery")}>
      Tilbake
    </Button>
  );
}
