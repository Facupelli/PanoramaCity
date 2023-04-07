import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Footer from "~/components/Footer";

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

  const sectionRef = useRef<HTMLElement | null>(null);
  const [navBg, setNavBg] = useState("transparent");
  const [sectionHeight, setSectionHeight] = useState<number | null>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (sectionHeight) {
          if (window.scrollY > sectionHeight && navBg === "transparent") {
            setNavBg("dark");
          }
          if (window.scrollY < sectionHeight && navBg === "dark") {
            setNavBg("transparent");
          }
        }
      });
    }
  }, [navBg, sectionHeight]);

  return (
    <>
      <Head>
        <title>Panorama City</title>
        <meta name="description" content="Modern real estate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar color={navBg} />

      <main className="grid min-h-screen gap-10 bg-neutral-100 font-barlow">
        <section
          ref={sectionRef}
          className="clip-landing-mobile sm:clip-landing relative bg-m-blue after:absolute after:top-0 after:left-0 after:h-[300px] after:w-full after:bg-landing-image after:content-['']"
        >
          <div className="relative mx-6 max-w-7xl xl:mx-auto ">
            <div className="grid h-[calc(100vh_+_350px)] w-full grid-cols-7 place-items-end pb-14 sm:h-[calc(100vh_+_100px)] sm:place-items-center sm:pb-0">
              <div className="relative z-30 col-span-7 rounded sm:col-span-3 ">
                <div className="grid gap-1 p-6">
                  <h1 className="bg-gradient-to-r from-[#ff4466] to-[rgb(255,164,181)] bg-clip-text py-1 text-5xl font-bold text-transparent">
                    Explorá tu futuro hogar. A un click de distancia.
                  </h1>
                  <p className="rounded-lg text-xl text-white">
                    Descubrí las mejores propiedades sin salir de tu casa.
                  </p>
                </div>
                <div className="grid gap-4 p-6">
                  <div className="flex items-center">
                    <input
                      {...register("location")}
                      type="search"
                      className="h-12 w-full rounded-bl-lg rounded-tl-lg border-none bg-white px-4 shadow-md sm:h-16"
                      placeholder="Ciudad, departamento"
                    />
                    <div>
                      <button
                        className="h-12 rounded-tr-lg rounded-br-lg bg-[#ff6884] px-4 shadow-md sm:h-16"
                        aria-label="search button"
                      >
                        <Search />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative col-span-7 h-[55vw] max-h-[800px] min-h-[300px] w-[55vw] min-w-[300px] max-w-[800px] sm:col-span-4">
                <div className="absoulte h-[55vw] max-h-[800px] min-h-[300px] w-[55vw] min-w-[300px] max-w-[800px] animate-move rounded-full bg-[#2c4358] duration-300 ease-in-out md:shadow-landing" />
                <Image
                  fill
                  src="/landing/town.svg"
                  alt="index-bg"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-6 max-w-7xl py-20 xl:mx-auto xl:w-full">
          <div className="grid  grid-cols-1 justify-between gap-10 sm:grid-cols-3">
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
                  src="/landing/choosing_house.svg"
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
                <Image
                  src="/landing/buy_house.svg"
                  alt="buy house illustration"
                  fill
                />
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
                <Image
                  src="/landing/for_sale.svg"
                  alt="buy house illustration"
                  fill
                />
              </div>
              <p className="rounded border border-m-blue bg-white p-2 font-semibold text-m-blue transition-all delay-75 duration-100 ease-in-out">
                Quiero publicar!
              </p>
            </button>
          </div>
        </section>

        <section className="mx-6 max-w-7xl py-20 xl:mx-auto">
          <h1 className="text-3xl font-bold">PROXIMAMENTE</h1>

          <div className="grid gap-20 pt-10">
            <article className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-20 ">
              <div className="relative col-span-1 aspect-[5/2] w-full">
                <Image
                  src="/landing/our_neighborhood.svg"
                  alt="neighborhood virtual tours illustration"
                  fill
                />
              </div>

              <div className="col-span-1 flex h-full items-center rounded bg-white p-6 shadow">
                <div className="grid gap-2">
                  <h2 className="text-lg font-semibold">
                    Recorrido virtual por tu barrio.
                  </h2>
                  <p>
                    Camina por las calles y plazas de tu futuro barrio. Mira
                    donde esta posicionada tu casa en el barrio. Recorre sus
                    alrededores.
                  </p>
                </div>
              </div>
            </article>

            <article className="flex flex-col-reverse items-center gap-10 sm:grid sm:grid-cols-2 sm:gap-20 ">
              <div className="col-span-1 flex h-full items-center rounded bg-white p-6 shadow">
                <div className="grid gap-2">
                  <h2 className="text-lg font-semibold">
                    Paga tu estadía mediante la blockchain.
                  </h2>
                  <p>
                    Paga el alquiler de tu casa de fin de semana con la
                    blockchain, a través de un contrato inteligente.
                    <span className="text-sm text-neutral-500">
                      {" "}
                      *Solo disponible para alquileres temporarios*
                    </span>
                  </p>
                </div>
              </div>

              <div className="relative col-span-1 aspect-[5/2] w-full">
                <Image
                  src="/landing/digital_currency.svg"
                  alt="blockchain illustration"
                  fill
                />
              </div>
            </article>

            <article className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-20 ">
              <div className="relative col-span-1 aspect-[5/2] w-full">
                <Image
                  src="/landing/split.svg"
                  alt="comparisoon properties illustration"
                  fill
                />
              </div>

              <div className="col-span-1 flex h-full items-center rounded bg-white p-6 shadow">
                <div className="grid gap-2">
                  <h2 className="text-lg font-semibold">
                    Compara propiedades.
                  </h2>
                  <p>
                    Compara las characterísticas principales de dos o más
                    propiedades para que puedas tomar decisiones informadas.
                  </p>
                </div>
              </div>
            </article>

            <article className="flex flex-col-reverse items-center gap-10 sm:grid sm:grid-cols-2 sm:gap-20 ">
              <div className="col-span-1 flex h-full items-center rounded bg-white p-6 shadow">
                <div className="grid gap-2">
                  <h2 className="text-lg font-semibold">
                    Reseña y calificación.
                  </h2>
                  <p>
                    Deja tu reseña y una calificación luego de tu estadía en una
                    propiedad. Podrás ver reseñas de propiedades y asi tomar una
                    decisión más informada.
                    <span className="text-sm text-neutral-500">
                      {" "}
                      *Solo disponible para alquileres temporarios*
                    </span>
                  </p>
                </div>
              </div>

              <div className="relative col-span-1 aspect-[5/2] w-full">
                <Image
                  src="/landing/reviews.svg"
                  alt="reviews and rating illustration"
                  fill
                />
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
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
