import { UserStepForm } from "./_components/user-step-form";

export default async function UserStepPage() {
  const pikachu = await getPikachu();
  return (
    <div className="flex flex-col gap-8">
      <h1>RSC Pokemon: {JSON.stringify(pikachu.name)}</h1>
      <UserStepForm />
    </div>
  );
}

export const getPikachu = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  return (await res.json()) as { name: string };
};
