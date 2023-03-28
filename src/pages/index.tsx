import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import NavBar from "~/components/NavBar";
import Search from "~/icons/Search";
import { useFilterStore } from "~/zustand/store";

type LandingForm = {
  location: string;
};

const Home: NextPage = () => {
  const setFilters = useFilterStore((state) => state.setFilters);
  const { data: sessionData } = useSession();
  const { register } = useForm<LandingForm>();
  const router = useRouter();

  const handlePostClick = () => {
    if (sessionData) {
      return router.push(`/user/${sessionData.user.id}/post`);
    }

    void signIn("google");
  };

  return (
    <>
      <Head>
        <title>Panorama City</title>
        <meta name="description" content="Modern real estate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar color="transparent" />

      <main className="min-h-screen bg-neutral-100 font-barlow">
        <section className="relative">
          <div className=" clip-landing-mobile sm:clip-landing grid h-[calc(100vh_+_300px)] w-full grid-cols-7 place-items-end bg-m-blue pb-14 after:absolute after:top-0 after:left-0 after:h-[300px] after:w-full after:bg-landing-image after:content-[''] sm:h-[calc(100vh_+_100px)] sm:place-items-center sm:pb-0">
            <div className="relative col-span-7 aspect-video w-full max-w-[900px] sm:col-span-4 sm:col-start-4">
              <Image
                fill
                src="/town.svg"
                alt="index-bg"
                style={{ objectFit: "contain" }}
              />
            </div>

            <div className="absolute top-24 mx-4 grid gap-6 rounded p-4 sm:top-[20%] sm:left-4 sm:mx-0 sm:max-w-[45%] sm:p-8">
              <div className="grid gap-6 ">
                <h1 className="bg-gradient-to-r from-[#ff6884] to-[#ffa7bd] bg-clip-text py-1 text-5xl font-bold text-transparent">
                  Buscar un inmueble nunca fue tan inmersivo.
                </h1>
                <p className="rounded-lg text-lg text-white">
                  Con nuestros toures vas a sentir que estas caminando por tu
                  futuro hogar. Descubrí las mejores propiedades sin salir de
                  casa.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center">
                  <input
                    {...register("location")}
                    type="search"
                    className="h-12 w-full rounded-bl-lg rounded-tl-lg border-none bg-white px-4 shadow-md sm:h-16"
                    placeholder="Ciudad, dirección, ZIP"
                  />
                  <div>
                    <button
                      className="h-12 rounded-tr-lg rounded-br-lg bg-[#6c63ff] px-4 shadow-md sm:h-16"
                      aria-label="search button"
                    >
                      <Search />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-4 py-20 sm:mx-24">
          <div className="grid grid-cols-1 justify-between gap-10 sm:grid-cols-3 ">
            <button
              onClick={() => {
                setFilters({
                  type: ["", ""],
                  operation: "clfrb2pa7002ee78wb43qej92",
                  price: {
                    min: "",
                    max: "",
                  },
                  ambiences: "",
                  bathrooms: "",
                  bedrooms: "",
                  surface: {
                    min: "",
                    max: "",
                  },
                  amenities: [""],
                  location: "all",
                });
                void router.push("/search");
              }}
              className="col-span-1 grid w-full justify-center gap-y-6 rounded bg-white p-6 shadow-md transition-all duration-100 ease-in-out hover:scale-110 hover:shadow-xl [&>p]:hover:bg-m-blue [&>p]:hover:text-white"
            >
              <div className="relative h-56 w-56">
                <Image
                  src="/choosing_house.svg"
                  alt="buy house illustration"
                  fill
                />
              </div>
              <p className="rounded border border-m-blue bg-white p-2 font-semibold text-m-blue transition-all duration-100 ease-in-out">
                Quiero alquilar!
              </p>
            </button>
            <button
              onClick={() => {
                setFilters({
                  type: ["", ""],
                  operation: "clfrb2pa7002ge78wqs0pa287",
                  price: {
                    min: "",
                    max: "",
                  },
                  ambiences: "",
                  bathrooms: "",
                  bedrooms: "",
                  surface: {
                    min: "",
                    max: "",
                  },
                  amenities: [""],
                  location: "all",
                });
                void router.push("/search");
              }}
              className="col-span-1 grid w-full justify-center gap-y-6 rounded bg-white p-6 shadow-md transition-all duration-100 ease-in-out hover:scale-110 hover:shadow-xl [&>p]:hover:bg-m-blue [&>p]:hover:text-white"
            >
              <div className="relative h-56 w-56">
                <Image src="/buy_house.svg" alt="buy house illustration" fill />
              </div>
              <p className="rounded border border-m-blue bg-white p-2 font-semibold text-m-blue transition-all duration-100 ease-in-out">
                Quiero comprar!
              </p>
            </button>
            <button
              onClick={handlePostClick}
              className="col-span-1 grid w-full justify-center gap-y-6 rounded bg-white p-6 shadow-md transition-all duration-100 ease-in-out hover:scale-110 hover:shadow-xl [&>p]:hover:bg-m-blue [&>p]:hover:text-white"
            >
              <div className="relative h-56 w-56">
                <Image src="/for_sale.svg" alt="buy house illustration" fill />
              </div>
              <p className="rounded border border-m-blue bg-white p-2 font-semibold text-m-blue transition-all delay-75 duration-100 ease-in-out">
                Quiero publicar!
              </p>
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
