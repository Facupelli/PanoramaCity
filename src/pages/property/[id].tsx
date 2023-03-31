import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { prisma } from "~/server/db";
import { type ParsedUrlQuery } from "querystring";
import Image from "next/image";

import { useState } from "react";

import NavBar from "~/components/NavBar";
import GalleryButtons from "~/components/PropertyDetail/GalleryButtons";
import IconDetails from "~/components/PropertyDetail/IconsDetail";
import PropertyHeader from "~/components/PropertyDetail/PropertyHeader";
import Gallery from "~/components/PropertyDetail/Gallery";
import Whatsapp from "~/icons/Whatsapp";

import type { User, Property } from "~/types/model";

type Props = {
  property?: Property;
};

export type MediaActive = {
  tour: boolean;
  images: boolean;
  video: boolean;
};

const NEXT_PUBLIC_GOOGLE_MAP_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAP_KEY as string;

const PropertyDetail: NextPage<Props> = ({ property }: Props) => {
  const [mediaActive, setMediaActive] = useState<MediaActive>({
    tour: true,
    images: false,
    video: false,
  });

  if (!property) {
    return <div>Property not found!</div>;
  }

  return (
    <>
      <Head>
        <title>Panorama City</title>
        <meta name="description" content="Modern real estate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className=" min-h-screen bg-neutral-100 pt-[70px]">
        <div className="mx-auto max-w-6xl ">
          {property.propertyMedia && (
            <Gallery
              propertyMedia={property.propertyMedia}
              mediaActive={mediaActive}
            />
          )}
          <section className="relative grid gap-y-10 px-24 py-10 font-barlow">
            <div className="grid grid-cols-7 gap-4">
              <div className="col-span-5 grid gap-y-10">
                <GalleryButtons
                  mediaActive={mediaActive}
                  setMediaActive={setMediaActive}
                />
                <PropertyHeader
                  property={{
                    title: property.title,
                    address: property.propertyInfo?.address,
                    zone: property.propertyInfo?.zone,
                    city: property.propertyInfo?.city,
                    createdAt: property.createdAt,
                  }}
                />
                <IconDetails property={property} />
                <section className="max-w-[75ch]">
                  <p>{property.description}</p>
                </section>
              </div>

              <div className="col-span-2">
                <div className="grid gap-y-4">
                  {property.user?.companyName && (
                    <RealEstateCard user={property.user} />
                  )}
                  {property.user && <OwnerData user={property.user} />}
                </div>
              </div>
            </div>
            <section className="grid gap-8 border-t border-b border-neutral-300 py-8">
              <section className="grid gap-4">
                <h2 className="text-lg font-semibold">Comodidades:</h2>
                <ul className="grid grid-cols-auto-utilities gap-2">
                  {property.amenities?.map((amenity) => (
                    <li key={amenity.id} className="list-inside list-disc">
                      <span className="relative -left-2">{amenity.name}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="grid gap-4">
                <h2 className="text-lg font-semibold">Utilidades:</h2>
                <ul className="grid grid-cols-auto-utilities gap-2">
                  {property.utilities?.map((utility) => (
                    <li key={utility.id} className="list-inside list-disc">
                      <span className="relative -left-2">{utility.name}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </section>
            <section>
              <iframe
                width="100%"
                height="350"
                // style="border:0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${NEXT_PUBLIC_GOOGLE_MAP_KEY}&q=${property.locationLat},${property.locationLng}&center=${property.locationLat},${property.locationLng}`}
              ></iframe>
            </section>
          </section>
        </div>
      </main>
    </>
  );
};

const RealEstateCard = ({ user }: { user: User }) => {
  return (
    <aside className="h-fit w-full rounded bg-white p-6 font-barlow shadow-md">
      <div className="grid gap-4">
        {user?.companyName && (
          <div className="flex items-center gap-4">
            {user.companyLogoUrl && (
              <div className="relative h-16 w-16 rounded-full">
                <Image
                  src={user.companyLogoUrl}
                  fill
                  alt="company_logo"
                  style={{ borderRadius: "100%" }}
                />
              </div>
            )}
            <p className="font-bold">{user.companyName}</p>
          </div>
        )}
      </div>
    </aside>
  );
};

const OwnerData = ({ user }: { user: User }) => {
  return (
    <aside className="w-full rounded bg-white p-6 font-barlow shadow-md">
      <p className="pb-3 text-sm text-neutral-500">CONTACTO</p>
      <div className="flex items-center gap-4">
        {user.image && (
          <div className="relative h-10 w-10 rounded-full">
            <Image
              src={user.image}
              fill
              alt="user_pic"
              style={{ borderRadius: "100%" }}
            />
          </div>
        )}
        <p className="font-semibold">{user.name}</p>
      </div>
      <div className="grid gap-4 pt-4">
        <div className="grid gap-1">
          <p>{user.email}</p>
          <p>
            teléfono: <b className="font-semibold">{user.phone}</b>
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-sm bg-green-500 py-1 text-white">
          enviar Whatsapp
          <Whatsapp />
        </button>
      </div>
    </aside>
  );
};

export default PropertyDetail;

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;

  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        amenities: true,
        utilities: true,
        propertyType: true,
        propertyMedia: true,
        propertyInfo: true,
        user: true,
      },
    });
    if (property) {
      return {
        props: {
          property: {
            ...property,
            createdAt: property.createdAt.toISOString(),
            updatedAt: property.updatedAt.toISOString(),
          },
        },
        revalidate: 10,
      };
    }
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      property: null,
    },
  };
};

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const properties = await prisma?.property.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: properties?.map((property) => ({
      params: {
        id: property.id,
      },
    })),
    fallback: "blocking",
  };
};
