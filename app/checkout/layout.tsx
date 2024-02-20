import { MultiStepProvider } from "./_components/multi-step-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MultiStepProvider>
      <div className="container mx-auto p-4">{children}</div>
    </MultiStepProvider>
  );
}
