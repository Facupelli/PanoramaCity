import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";

import NavBar from "~/components/NavBar";
import Search from "~/icons/Search";

type LandingForm = {
  action: string;
  location: string;
};

const Home: NextPage = () => {
  const { register, watch } = useForm<LandingForm>({
    defaultValues: { action: "rent" },
  });

  const action = watch("action");

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
          <div className="relative aspect-[16/10] w-full after:absolute after:top-0 after:left-0 after:h-[800px] after:w-full after:bg-landing-image after:content-['']">
            <Image
              fill
              src="/cozy-house-1.png"
              alt="index-bg"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="after " />

          <div className="absolute top-1/3 left-24 grid max-w-[45%] gap-6">
            <div className="grid gap-4">
              <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-bold text-transparent">
                Encuentra. Toureala. Hazla tuya.
              </h1>
              <p className="rounded-lg  p-2  text-lg text-white">
                ¡Con nuestra experiencia inmersiva vas a sentir que estás
                caminando por tu futura propiedad! Descubrí las mejores
                propiedades sin salir de casa.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex gap-10">
                <label
                  htmlFor="rent"
                  className={`cursor-pointer border-b-4 py-1 text-center text-white ${
                    action === "rent"
                      ? "border-white font-semibold"
                      : "border-transparent"
                  }`}
                >
                  Alquilar
                </label>
                <input
                  id="rent"
                  type="radio"
                  value="rent"
                  {...register("action")}
                  className="hidden"
                />

                <label
                  htmlFor="buy"
                  className={`cursor-pointer border-b-4 py-1 text-center text-white ${
                    action === "buy"
                      ? " border-white font-semibold"
                      : "border-transparent"
                  }`}
                >
                  Comprar
                </label>
                <input
                  id="buy"
                  type="radio"
                  value="buy"
                  {...register("action")}
                  className="hidden"
                />

                <label
                  htmlFor="post"
                  className={`cursor-pointer border-b-4 py-1 text-center text-white ${
                    action === "post"
                      ? "border-white font-semibold"
                      : "border-transparent"
                  }`}
                >
                  Publicar
                </label>
                <input
                  id="post"
                  value="post"
                  type="radio"
                  {...register("action")}
                  className="hidden"
                />
              </div>
              <div className="flex items-center">
                <input
                  {...register("location")}
                  type="search"
                  className="h-16 w-full rounded-bl-lg rounded-tl-lg border-none bg-white px-4 shadow-md"
                  placeholder="Ciudad, dirección, ZIP"
                />
                <div>
                  <button
                    className="h-16 rounded-tr-lg rounded-br-lg bg-m-blue px-4 shadow-md"
                    aria-label="search button"
                  >
                    <Search />
                  </button>
                </div>
              </div>
            </div>
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
