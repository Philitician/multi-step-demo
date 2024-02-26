"use client";

import { useMultiStep, type Step } from "./multi-step-provider";
import { cn } from "@/lib/utils";

const navStepsLUT = {
  user: "Bruker",
  location: "Lokasjon",
  delivery: "Levering",
  payment: "Betaling",
} satisfies Record<Step, string>;

export function MultiStepLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col container mx-auto p-4">
      <nav className="flex gap-4">
        {(Object.keys(navStepsLUT) as Step[]).map((navStep) => (
          <NavStep key={navStep} step={navStep} />
        ))}
      </nav>
      {children}
    </div>
  );
}

type NavStepProps = {
  step: Step;
};

function NavStep({ step }: NavStepProps) {
  const { step: currentStep } = useMultiStep();
  return (
    <div
      className={cn("rounded-lg p-2", {
        "bg-teal-500": step === currentStep,
      })}
    >
      {navStepsLUT[step]}
    </div>
  );
}
