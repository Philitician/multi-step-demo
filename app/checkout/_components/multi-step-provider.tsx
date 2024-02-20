"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
import { UserStepValues } from "../user/_components/user-step-form";
import { LocationStepValues } from "../location/_components/location-step-form";

export type State = {
  user: UserStepValues;
  location: LocationStepValues;
};

type Step = "user" | "location";

type MultiStepContext = {
  state: State;
  step: Step;
  goTo: (step: Step) => void;
  updateState: (newState: Partial<State>) => void;
};

const MultiStepContext = createContext<MultiStepContext | undefined>(undefined);

export function MultiStepProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<State>({
    user: {
      name: "",
    },
    location: {
      address: "",
    },
  });
  const [step, setStep] = React.useState<Step>("user");
  const router = useRouter();

  const goToStep = (step: Step) => {
    setStep(step);
    router.push(`/checkout/${step}`);
  };

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <MultiStepContext.Provider
      value={{ state, step, goTo: goToStep, updateState }}
    >
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          <h2 className="text-2xl font-bold">Current state:</h2>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
        {children}
      </div>
    </MultiStepContext.Provider>
  );
}

export function useMultiStep() {
  const context = useContext(MultiStepContext);
  if (!context) {
    throw new Error("useMultiStep must be used within a MultiStepProvider");
  }
  return context;
}
