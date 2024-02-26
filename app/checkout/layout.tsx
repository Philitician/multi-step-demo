import { MultiStepLayout } from "./_components/multi-step-layout";
import { MultiStepProvider } from "./_components/multi-step-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MultiStepProvider>
      <MultiStepLayout>{children}</MultiStepLayout>
    </MultiStepProvider>
  );
}
