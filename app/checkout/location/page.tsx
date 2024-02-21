import { LocationStepForm } from "./_components/location-step-form";

export default async function LocationStepPage() {
  const ditto = await getDitto();
  return (
    <div className="flex flex-col gap-8">
      <h1>RSC Pokemon: {JSON.stringify(ditto.name)}</h1>
      <LocationStepForm />
    </div>
  );
}

const getDitto = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  return (await res.json()) as { name: string };
};
