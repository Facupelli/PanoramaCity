import { type GetStaticPaths, type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { prisma } from "~/server/db";
import { ParsedUrlQuery } from "querystring";

import { useState } from "react";

import NavBar from "~/components/NavBar";
import GalleryButtons from "~/components/PropertyDetail/GalleryButtons";

import IconDetails from "~/components/PropertyDetail/IconsDetail";
import PropertyHeader from "~/components/PropertyDetail/PropertyHeader";

import { type Property } from "~/types/model";

type Props = {
  property?: Property;
};

const Home: NextPage = ({ property }: Props) => {
  console.log("PROPERTY", property);

  const [proper, setProper] = useState<Property>({
    id: "sdasd",
    typeId: "ds",
    type: { id: "asd", name: "Departamento" },
    userId: "sds",
    title: "Departamento para alugar com 55m², 1 quarto e sem vaga",
    description:
      "Imóvel amplo para alugar com 1 quarto e 1 banheiro no total. Este imóvel fica situado no 4º andar. O condomínio é bem equipado com diversas instalações e fica localizado em Rua Fidencio Ramos no bairro Vila Olímpia em São Paulo. Está bem localizado, próximo a pontos de interesse de Vila Olímpia, tais como DeRose Method Vila Olímpia, Shopping Vila Olímpia, Shopping JK Iguatemi, Teatro Vento Forte, Parque do Povo e Estação Vila Olímpia.",
    operation: "Alquiler",
    price: 8500,
    locationLat: -31.52471936821179,
    locationLng: -68.5823669732075,
    createdAt: new Date("01/04/2022"),
    updatedAt: new Date("01/04/2022"),
    propertyInfo: {
      id: "sdf",
      propertyId: "sfd",
      ambiences: 2,
      bathrooms: 1,
      bedrooms: 2,
      address: "Calle Los Cedros 4234",
      city: "San Juan",
      zone: "Rivadavia",
      surface: 12000,
      buildYear: 1998,
      orientation: "oeste",
      floor: 3,
    },
  });

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
          <div className="aspect-[16/6] w-full">
            <iframe
              width="100%"
              height="100%"
              // src="https://my.matterport.com/show/?m=KpBQUvEMirJ"
              src="https://tour.metareal.com/apps/player?asset=9be7133d-0eda-4672-bf3c-51bf6b8f88fb&position=-6.40x1.58y5.38z&rotation=6.53x-19.14y0.00z"
              allow="xr-spatial-tracking"
              allowFullScreen
            ></iframe>
          </div>
          <section className="grid gap-y-10 px-24 py-10 font-barlow">
            <GalleryButtons />
            <PropertyHeader
              property={{
                title: proper.title,
                address: proper.propertyInfo?.address,
                zone: proper.propertyInfo?.zone,
                city: proper.propertyInfo?.city,
                createdAt: proper.createdAt,
              }}
            />
            <IconDetails property={proper} />
            <div className="max-w-[75ch]">
              <p>{proper.description}</p>
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
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&q=${proper.locationLat},${proper.locationLng}&center=${proper.locationLat},${proper.locationLng}`}
              ></iframe>
            </div>
            {/* {proper?.description} */}
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const property = await prisma?.property.findUnique({
    where: { id },
    include: { amenities: true, propertyType: true },
  });

  return {
    props: {
      property: JSON.parse(JSON.stringify(property)),
    },
    revalidate: 10,
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
