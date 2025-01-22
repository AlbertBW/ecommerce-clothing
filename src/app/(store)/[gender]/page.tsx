import { GENDER_HOME_PARAMS } from "@/lib/constants";
import { genderHomePage, getGenderParams } from "@/use-cases/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import menTshirt from "../../../../public/t-shirt-white.jpeg";
import womenTshirt from "../../../../public/t-shirt-white.jpeg";

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

  if (!GENDER_HOME_PARAMS.includes(gender)) {
    notFound();
  }

  const data = await genderHomePage(gender);

  return (
    <>
      <section>
        <Image
          src={gender === "men" ? menTshirt : womenTshirt}
          alt={"Men"}
          width={0}
          style={{
            position: "absolute",
            top: 0,
            zIndex: -10,
            width: "100%",
            height: "70%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </section>
    </>
  );
}
