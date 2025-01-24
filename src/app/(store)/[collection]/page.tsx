import { COLLECTION_PARAMS } from "@/lib/constants";
import { notFound } from "next/navigation";
import Image from "next/image";
import menTshirt from "../../../../public/t-shirt-white.jpeg";
import womenTshirt from "../../../../public/t-shirt-white.jpeg";

export async function generateStaticParams() {
  return COLLECTION_PARAMS.map((collection) => ({
    collection,
    category: ["all"],
  }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const collection = (await params).collection;

  if (!COLLECTION_PARAMS.includes(collection)) {
    notFound();
  }

  // const data = await collectionHomePage(gender);

  return (
    <>
      <section>
        <Image
          src={collection === "men" ? menTshirt : womenTshirt}
          alt={"Men"}
          width={0}
          priority
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
