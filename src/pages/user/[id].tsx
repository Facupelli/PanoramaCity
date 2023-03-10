import { type GetStaticPaths, type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { prisma } from "~/server/db";
import { ParsedUrlQuery } from "querystring";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

import NavBar from "~/components/NavBar";
import Address from "~/components/PropertyForm/Address";
import Characteristics from "~/components/PropertyForm/Characteristics";
import MainInfo from "~/components/PropertyForm/MainInfo";
import PageBtn from "~/components/UI/PageBtn";

import { type PropertyType, type Property, type User } from "~/types/model";
import { type FormData } from "~/types/createProperty";
import Fieldset from "~/components/UI/FieldSet";

type Props = {
  user?: User;
  propertyTypes: PropertyType[];
};

export const steps = 3;

const UserDetail: NextPage<Props> = ({ user, propertyTypes }: Props) => {
  const { data: sessionData } = useSession();

  const createProperty = api.property.createProperty.useMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [step, setStep] = useState(1);

  const onSubmit = async (data: FormData) => {
    const parsedAddres = encodeURI(
      `${data.propertyInfo.address} ${data.propertyInfo.city} Argentina`
    );
    const response = await axios(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${parsedAddres}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
    );

    console.log("response", response.data);

    const propertyData = {
      typeId: data.typeId,
      userId: sessionData?.user.id ?? "",
      price: Number(data.price),
      title: data.title,
      description: data.description,
      operation: data.operation,
      locationLat: -31.51903398124165,
      locationLng: -68.57562323506707,
      propertyInfo: {
        ambiences: Number(data.propertyInfo.ambiences),
        bedrooms: Number(data.propertyInfo.bedrooms),
        bathrooms: Number(data.propertyInfo.bathrooms),
        floor: Number(data.propertyInfo.floor ?? 0),
        surface: Number(data.propertyInfo.surface),
        buildYear: Number(data.propertyInfo.buildYear),
        address: data.propertyInfo.address,
        city: data.propertyInfo.city,
        zone: data.propertyInfo.zone,
        orientation: data.propertyInfo.orientation,
      },
    };

    // createProperty.mutate(propertyData);
  };

  return (
    <>
      <Head>
        <title>Panorama City</title>
        <meta name="description" content="Modern real estate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="min-h-screen bg-neutral-100 pt-[70px]">
        <div className="mx-auto max-w-6xl px-24 py-10 font-barlow">
          <div className="flex items-baseline justify-between gap-24 ">
            <h1 className="text-2xl font-semibold">Publicar un inmueble</h1>

            <div className="h-[3px] grow rounded-lg bg-white">
              <div
                className={`h-[3px] rounded-lg bg-marino transition-all delay-100 duration-200 ease-out ${
                  step === 1 && "w-[33%]"
                } ${step === 2 && "w-[66%]"} ${step === 3 && "w-[99%]"}`}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
            {step === 1 && (
              <Fieldset title="Información principal" step={step}>
                <MainInfo
                  register={register}
                  watch={watch}
                  propertyTypes={propertyTypes}
                />
              </Fieldset>
            )}
            {step === 2 && (
              <Fieldset title="Dirección del inmueble" step={step}>
                <Address register={register} watch={watch} step={step} />
              </Fieldset>
            )}
            {step === 3 && (
              <Fieldset title="Características del inmueble" step={step}>
                <Characteristics
                  register={register}
                  watch={watch}
                  step={step}
                />
              </Fieldset>
            )}

            <div className="grid grid-cols-6">
              <div className="col-span-4 col-start-3 flex items-center justify-center gap-2 ">
                {step !== 1 && (
                  <PageBtn
                    type="prev"
                    handleClick={() => setStep((prev) => (prev -= 1))}
                  />
                )}
                {step === 3 ? (
                  <button
                    type="submit"
                    className="rounded bg-oliva py-2 px-4 text-sm font-semibold text-white"
                  >
                    FINALIZAR
                  </button>
                ) : (
                  <PageBtn
                    type="next"
                    handleClick={() => setStep((prev) => (prev += 1))}
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default UserDetail;

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const user = await prisma.user.findUnique({
    where: { id },
  });

  const propertyTypes: PropertyType[] = await prisma.propertyType.findMany({});

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      propertyTypes,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const users = await prisma?.user.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: users?.map((user) => ({
      params: {
        id: user.id,
      },
    })),
    fallback: "blocking",
  };
};
