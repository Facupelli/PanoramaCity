import { type GetStaticPaths, type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { prisma } from "~/server/db";
import { type ParsedUrlQuery } from "querystring";

import { useState } from "react";

import NavBar from "~/components/NavBar";
import GalleryButtons from "~/components/PropertyDetail/GalleryButtons";
import IconDetails from "~/components/PropertyDetail/IconsDetail";
import PropertyHeader from "~/components/PropertyDetail/PropertyHeader";

import { type Property } from "~/types/model";
import Gallery from "~/components/PropertyDetail/Gallery";

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

const PropertyDetail: NextPage = ({ property }: Props) => {
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
          <section className="grid gap-y-10 px-24 py-10 font-barlow">
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
            <div className="max-w-[75ch]">
              <p>{property.description}</p>
            </div>
            <div>
              {/* <h3 className="text-lg font-semibold">Comodidades:</h3> */}
            </div>
            <div className="bg-red-200">
              <iframe
                width="100%"
                height="350"
                // style="border:0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${NEXT_PUBLIC_GOOGLE_MAP_KEY}&q=${property.locationLat},${property.locationLng}&center=${property.locationLat},${property.locationLng}`}
              ></iframe>
            </div>
            {/* {proper?.description} */}
          </section>
        </div>
      </main>
    </>
  );
};

export default PropertyDetail;

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;

  try {
    const property: Property | null = await prisma.property.findUnique({
      where: { id },
      include: {
        amenities: true,
        propertyType: true,
        propertyMedia: true,
        propertyInfo: true,
      },
    });

    return {
      props: {
        property: JSON.parse(JSON.stringify(property)),
      },
      revalidate: 10,
    };
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
