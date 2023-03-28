import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import NavBar from "~/components/NavBar";
import { api } from "~/utils/api";

type NewUserForm = {
  name: string;
  phone: string;
  companyName?: string;
  companyLogoUrl?: string;
};

const NewUser: NextPage = () => {
  const { data: sessionData } = useSession();
  const { register, handleSubmit } = useForm<NewUserForm>();
  const router = useRouter();

  const { mutate, isLoading } = api.user.putUserInfo.useMutation();

  const onSubmit = (data: NewUserForm) => {
    mutate(
      { ...data, id: sessionData?.user.id },
      {
        onSuccess: () => {
          toast.success("Perfil creado con éxito!");
          void router.push("/search");
        },
        onError: (err) => {
          console.log(err);
          toast.error(
            "Algo salió mal. Por favor intenta completar tu perfil más tarde."
          );
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Panorama City</title>
        <meta name="description" content="Modern real estate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="min-h-screen bg-neutral-100 pt-[70px] font-barlow">
        <div className="mx-auto grid justify-center gap-8  pt-10">
          <h1 className="text-3xl font-semibold">
            Bienvenido{" "}
            <span className="text-t-blue">{sessionData?.user.name}</span>
          </h1>
          <div className="max-w-[500px]">
            <p>
              Completa los siguientes datos para poder publicar tus inmuebles.
            </p>
            <p>
              Si solo deseas ver inmuebles puedes volver al inicio haciendo{" "}
              <Link className="text-t-blue underline" href="/">
                click aquí
              </Link>
            </p>
          </div>
          {sessionData && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid max-w-[500px] gap-y-4 "
            >
              <div className="grid">
                <label>Nombre:</label>
                <input
                  className="rounded-md border border-neutral-200 p-2"
                  type="text"
                  {...register("name")}
                  required
                  defaultValue={sessionData.user.name as string}
                />
              </div>
              <div className="grid">
                <label>Teléfeno:</label>
                <input
                  className="rounded-md border border-neutral-200 p-2"
                  type="text"
                  {...register("phone")}
                  placeholder="+54 264433998"
                  required
                />
              </div>
              <p className="font-semibold">
                Si tienes una inmobiliaria llena los siguientes campos:
              </p>
              <div className="grid">
                <label>Nombre inmobiliaira:</label>
                <input
                  className="rounded-md border border-neutral-200 p-2"
                  type="text"
                  {...register("companyName")}
                  placeholder="Zillow"
                />
              </div>
              <div className="grid">
                <label>Logo inmobiliaria:</label>
                <input
                  className="rounded-md border border-neutral-200 p-2"
                  type="text"
                  {...register("companyLogoUrl")}
                  placeholder="https://milogo.png"
                />
              </div>
              <button
                type="submit"
                className="rounded-sm border border-t-blue p-2 font-semibold text-t-blue"
              >
                FINALIZAR
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
};

export default NewUser;
