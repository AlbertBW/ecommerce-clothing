import { getGenderParams } from "@/use-cases/products";

export async function generateStaticParams() {
  const genders = getGenderParams();
  console.log(genders);
  return genders.map((gender) => ({
    gender,
  }));
}

export default async function GenderPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const gender = (await params).gender;

  if (gender != "men" || "women") return <div>Error</div>;

  return <div>GenderPage {gender}</div>;
}
