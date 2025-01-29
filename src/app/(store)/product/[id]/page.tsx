import BackButton from "@/app/_components/back-button";
import Image from "next/image";
import shirt from "../../../../../public/t-shirt-white.jpeg";
import { getProductDetailsById } from "@/use-cases/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = await getProductDetailsById((await params).id);
  return (
    <>
      <div className="max-w-screen-xl mt-8 ml-4 md:mx-auto">
        <BackButton />
      </div>
      <div className="min-h-[calc(100vh-197px)] max-w-screen-xl flex text-center mx-auto">
        <div className="flex md:flex-row flex-col mb-24 items-center w-full justify-between">
          <div className="my-8 md:my-0">
            <Image src={shirt} alt={"product name"} width={650} height={650} />
          </div>
          <div className="flex flex-col justify-between gap-4 md:w-2/5 text-xl md:mx-auto">
            <h1 className="font-bold">brand</h1>
            <div>name</div>

            <div className="w-full mx-auto">
              <div className="flex flex-col justify-between mx-auto gap-2 my-4">
                <h2>Colours</h2>
                <div className="flex justify-center md:w-full gap-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <button
                      type="button"
                      key={i}
                      className={`min-w-20 md:h-12 h-10 border rounded-md transition-colors delay-0 `}
                    >
                      colour
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between mx-auto gap-2">
                <h2>Size</h2>
                <div className="flex justify-center w-3/5 mx-auto gap-2">
                  {Array.from({ length: 6 }, (_, i) => {
                    return (
                      <button
                        type="button"
                        key={i}
                        className={`md:w-32 md:h-12 w-24 h-10 border rounded-md transition-colors delay-0 `}
                      >
                        variant size
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
