import { type GetStaticPaths, type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { prisma } from "~/server/db";
import { type ParsedUrlQuery } from "querystring";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

import NavBar from "~/components/NavBar";
import Address from "~/components/PropertyForm/Address";
import Characteristics from "~/components/PropertyForm/Characteristics";
import MainInfo from "~/components/PropertyForm/MainInfo";
import PageBtn from "~/components/UI/PageBtn";
import Fieldset from "~/components/UI/FieldSet";
import ImagesUpload from "~/components/PropertyForm/ImagesUpload";
import GoBackButton from "~/components/UI/GoBackButton";

import {
  type PropertyType,
  type User,
  type Operation,
  type Amenity,
  type Utility,
} from "~/types/model";
import { validationSchema, type FormData } from "~/types/createProperty";
import Amenities from "~/components/PropertyForm/Amenities";

type Props = {
  user?: User;
  propertyTypes: PropertyType[];
  operations: Operation[];
  amenities: Amenity[];
  utilities: Utility[];
};

export const steps = 5;

const UserPostProperty: NextPage<Props> = ({
  propertyTypes,
  operations,
  amenities,
  utilities,
}: Props) => {
  const { data: sessionData } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(validationSchema) });
  const createProperty = api.property.createProperty.useMutation();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  //IMAGES
  const [urls, setUrls] = useState<string[]>([]);
  //STEPS
  const [step, setStep] = useState(1);

  const onSubmit = (data: FormData) => {
    // const parsedAddres = encodeURI(
    //   `${data.propertyInfo.address} ${data.propertyInfo.city} Argentina`
    // );
    // const response = await axios(
    //   `https://maps.googleapis.com/maps/api/geocode/json?address=${parsedAddres}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
    // );

    // console.log("response", response.data);
    const propertyData = {
      typeId: data.typeId,
      userId: sessionData?.user.id ?? "",
      price: Number(data.price),
      title: data.title,
      description: data.description,
      operationId: data.operationId,
      locationLat: -31.549338520859266,
      locationLng: -68.54317943487884,
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
      media: {
        images: urls,
      },
      amenities: data.amenities.map((amenityId) => ({ id: amenityId })),
      utilities: data.utilities.map((utilityId) => ({ id: utilityId })),
    };

    createProperty.mutate(propertyData);
    setStep((prev) => (prev += 1));
  };

  const handleNextPage = () => {
    if (step === 5) {
      if (buttonRef.current) {
        return buttonRef.current.click();
      }
    }
    setStep((prev) => (prev += 1));
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
        {/* <UserLayout> */}
        <div className="mx-auto max-w-6xl py-10 px-4 sm:px-10">
          <GoBackButton />
          <div className="grid flex-col items-baseline justify-between gap-4 font-barlow sm:grid-cols-6 sm:flex-row sm:gap-0 ">
            <h1 className=" text-2xl font-bold sm:col-span-2">
              Publicar un inmueble
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
            {step === 1 && (
              <Fieldset title="Información principal" step={step}>
                <MainInfo
                  register={register}
                  watch={watch}
                  propertyTypes={propertyTypes}
                  operations={operations}
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
            {step === 4 && (
              <Fieldset title="Comodidades del inmueble" step={step}>
                <Amenities
                  register={register}
                  watch={watch}
                  amenities={amenities}
                  utilites={utilities}
                />
              </Fieldset>
            )}
            {step === 5 && (
              <Fieldset title="Fotos del inmueble" step={step}>
                <ImagesUpload setUrls={setUrls} urls={urls} />
              </Fieldset>
            )}

            <div className="grid grid-cols-6">
              <div className="col-span-4 col-start-2 flex items-center justify-center gap-2 sm:col-start-3 ">
                {step !== 1 && (
                  <PageBtn
                    type="prev"
                    handleClick={() => setStep((prev) => (prev -= 1))}
                  />
                )}
                {<PageBtn type="next" handleClick={handleNextPage} />}
              </div>
            </div>
            <button
              ref={buttonRef}
              type="submit"
              className="hidden rounded bg-s-blue py-2 px-4 text-sm font-semibold text-white"
            >
              Siguiente
            </button>
          </form>
        </div>
        {/* </UserLayout> */}
      </main>
    </>
  );
};

export default UserPostProperty;

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const user = await prisma.user.findUnique({
    where: { id },
  });

  const propertyTypes: PropertyType[] = await prisma.propertyType.findMany({});
  const operations: Operation[] = await prisma.operation.findMany({});
  const amenities: Amenity[] = await prisma.amenity.findMany({});
  const utilities: Amenity[] = await prisma.utility.findMany({});

  return {
    props: {
      user: {
        ...user,
        emailVerified: user?.emailVerified
          ? user.emailVerified.toISOString()
          : "",
      },
      propertyTypes,
      operations,
      amenities,
      utilities,
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
