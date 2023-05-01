import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { type ParsedUrlQuery } from "querystring";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

import NavBar from "~/components/NavBar";
import Address from "~/components/PropertyForm/Address";
import Characteristics from "~/components/PropertyForm/Characteristics";
import MainInfo from "~/components/PropertyForm/MainInfo";
import PageBtn from "~/components/UI/PageBtn";
import ImagesUpload from "~/components/PropertyForm/ImagesUpload";
import GoBackButton from "~/components/UI/GoBackButton";
import Amenities from "~/components/PropertyForm/Amenities";
import FormLayout from "~/components/UI/Layouts/FormLayout";

import {
  validateStep1,
  validateStep2,
  validateStep3,
} from "~/utils/postProperty";

import type {
  PropertyType,
  User,
  Operation,
  Amenity,
  Utility,
} from "~/types/model";
import { validationSchema, type FormData } from "~/types/createProperty";

type Props = {
  user?: User;
  propertyTypes: PropertyType[];
  operations: Operation[];
  amenities: Amenity[];
  utilities: Utility[];
};

// export const steps = 5;

const UserPostProperty: NextPage<Props> = ({
  propertyTypes,
  operations,
  amenities,
  utilities,
}: Props) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(validationSchema) });

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const propertyNumber = watch("propertyInfo.street_number");
  const propertyStreet = watch("propertyInfo.street_name");

  const { mutate, isLoading } = api.property.createProperty.useMutation();

  //IMAGES
  const [urls, setUrls] = useState<string[]>([]);

  //STEPS
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const validations = [validateStep1, validateStep2, validateStep3];

  const handleNextPage = async () => {
    if (step === totalSteps && buttonRef.current) {
      // buttonRef.current.click();
      return;
    }

    if (step === 4) {
      setStep((prev) => prev + 1);
      return;
    }

    const validation = validations[step - 1];
    if (validation) {
      const isValid = await validation(trigger);
      if (isValid) {
        setStep((prev) => prev + 1);
      }
    }
  };

  const onSubmit = (data: FormData) => {
    if (isLoading) return;

    const loadingPostId = toast.loading("Cargando");
    if (sessionData?.user.id) {
      const propertyData = {
        typeId: data.typeId,
        userId: sessionData?.user.id ?? "",
        price: Number(data.price),
        title: data.title,
        description: data.description,
        operationId: data.operationId,
        propertyInfo: {
          ambiences: Number(data.propertyInfo.ambiences),
          bedrooms: Number(data.propertyInfo.bedrooms),
          bathrooms: Number(data.propertyInfo.bathrooms),
          floor: Number(data.propertyInfo.floor ?? 0),
          surface: Number(data.propertyInfo.surface),
          buildYear: Number(data.propertyInfo.buildYear),
          address: `${data.propertyInfo.street_name} ${data.propertyInfo.street_number}`,
          zipCode: data.propertyInfo.zip_code,
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

      mutate(propertyData, {
        onSuccess: () => {
          toast.success("Propiedad creada con éxito!");
          void router.push(`/user/${sessionData.user.id}`);
        },
        onError: (err) => {
          console.log(err);
          toast.error("Lo siento, no se pudo crear la propiedad");
        },
      });
      toast.dismiss(loadingPostId);
    }
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
          <div className="flex items-center gap-10 font-barlow">
            <GoBackButton />
            <h1 className="text-2xl font-bold">Publicar un inmueble</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
            <FormLayout step={step}>
              {step === 1 && (
                <MainInfo
                  register={register}
                  watch={watch}
                  propertyTypes={propertyTypes}
                  operations={operations}
                  errors={errors}
                />
              )}
              {step === 2 && (
                <Address
                  register={register}
                  watch={watch}
                  step={step}
                  errors={errors}
                />
              )}
              {step === 3 && (
                <Characteristics
                  register={register}
                  watch={watch}
                  step={step}
                  errors={errors}
                />
              )}
              {step === 4 && (
                <Amenities
                  register={register}
                  watch={watch}
                  amenities={amenities}
                  utilites={utilities}
                />
              )}
              {step === 5 && (
                <ImagesUpload
                  setUrls={setUrls}
                  urls={urls}
                  propertyAddress={`${propertyStreet} ${propertyNumber}`}
                />
              )}
            </FormLayout>

            <div className="grid grid-cols-6">
              <div className="col-span-4 col-start-2 flex items-center justify-center gap-2 sm:col-start-3 ">
                {step !== 1 && (
                  <PageBtn
                    type="prev"
                    handleClick={() => setStep((prev) => (prev -= 1))}
                  />
                )}
                {step === totalSteps && (
                  <button
                    ref={buttonRef}
                    type="submit"
                    className="rounded bg-s-blue py-2 px-4 text-sm font-semibold text-white"
                  >
                    Finalizar
                  </button>
                )}
                {step !== totalSteps && (
                  <PageBtn type="next" handleClick={handleNextPage} />
                )}
              </div>
            </div>
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
