import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import { useFilterStore } from "~/zustand/store";

import NavBar from "~/components/NavBar";
import PropertyCard from "~/components/PropertyCard/PropertyCard";
import Map from "~/components/Map/Map";
import FilterNav from "~/components/FilterNav";

import {
  type Operation,
  type PropertyType,
  type Property,
  type Amenity,
} from "~/types/model";

type Props = {
  properties: Property[];
  operations: Operation[];
  propertyTypes: PropertyType[];
  amenities: Amenity[];
};

const Home: NextPage<Props> = ({
  properties,
  operations,
  propertyTypes,
  amenities,
}: Props) => {
  const hasMounted = useRef(false);
  const [activeProperty, setActiveProperty] = useState<string>("");
  const [propertiesList, setPropertiesList] = useState<Property[]>(properties);

  const filters = useFilterStore((state) => state.filters);
  const sort = useFilterStore((state) => state.sort);

  const getFilteredProperties =
    api.property.getFilteredProperties.useMutation();

  useEffect(() => {
    if (!hasMounted.current) {
      if (
        filters.ambiences ||
        filters.amenities[0] ||
        filters.bathrooms ||
        filters.bedrooms ||
        filters.operation !== "all" ||
        filters.type[0] ||
        filters.surface.max ||
        filters.surface.min ||
        filters.price.max ||
        filters.price.min ||
        sort
      ) {
        getFilteredProperties.mutate(
          { ...filters, sort },
          {
            onSuccess(data) {
              if (data.properties && data.properties.length > 0) {
                setPropertiesList(data.properties);
                return;
              }
              //MENSAJE PROPIEDADES NO ENCONTRAdAS
            },
          }
        );
      }
      hasMounted.current = true;
    }

    return () => {
      hasMounted.current = false;
    };
  }, [filters, sort]);

  // const properties = [
  //   {
  //     id: "sdasd",
  //     typeId: "ds",
  //     type: { id: "asd", name: "Departamento" },
  //     userId: "sds",
  //     title: "string",
  //     description: "dgfgfdsdgf",
  //     operationId: "Dfgdfg",
  //     price: 8500,
  //     locationLat: -31.52471936821179,
  //     locationLng: -68.5823669732075,
  //     createdAt: new Date("01/04/2022"),
  //     updatedAt: new Date("01/04/2022"),
  //     propertyInfo: {
  //       id: "sdf",
  //       propertyId: "sfd",
  //       ambiences: 2,
  //       bathrooms: 1,
  //       bedrooms: 2,
  //       address: "Calle Los Cedros 4234",
  //       city: "San Juan",
  //       zone: "Rivadavia",
  //       surface: 12000,
  //       buildYear: 1998,
  //       orientation: "dfg",
  //     },
  //   },
  //   {
  //     id: "sdytrrtyasd",
  //     typeId: "ds",
  //     type: { id: "afd", name: "Departamento" },
  //     userId: "sds",
  //     title: "string",
  //     description: "dgfgfdsdgf",
  //     operationId: "Dfgdfg",
  //     price: 11000,
  //     locationLat: -31.521715506516014,
  //     locationLng: -68.58110400550659,
  //     createdAt: new Date("01/04/2022"),
  //     updatedAt: new Date("01/04/2022"),
  //     propertyInfo: {
  //       id: "ert",
  //       propertyId: "sfd",
  //       ambiences: 3,
  //       bathrooms: 1,
  //       bedrooms: 2,
  //       address: "Sergio Boggian, 543",
  //       city: "San Juan",
  //       zone: "Rivadavia",
  //       surface: 23000,
  //       buildYear: 2015,
  //       orientation: "dfg",
  //     },
  //   },
  //   {
  //     id: "ghdfd",
  //     typeId: "ds",
  //     type: { id: "avc", name: "Casa" },
  //     userId: "sds",
  //     title: "string",
  //     description: "dgfgfdsdgf",
  //     operationId: "Dfgdfg",
  //     price: 54000,
  //     locationLat: -31.529170907268195,
  //     locationLng: -68.5197871440546,
  //     createdAt: new Date("01/04/2022"),
  //     updatedAt: new Date("01/04/2022"),
  //     propertyInfo: {
  //       id: "cvbn",
  //       propertyId: "sfd",
  //       ambiences: 4,
  //       bathrooms: 1,
  //       bedrooms: 2,
  //       address: "Obispo Slaguero 585",
  //       city: "San Juan",
  //       zone: "Rivadavia",
  //       surface: 9200,
  //       buildYear: 1998,
  //       orientation: "dfg",
  //     },
  //   },
  //   {
  //     id: "asdafvsccx",
  //     typeId: "ds",
  //     type: { id: "avc", name: "Casa" },
  //     userId: "sds",
  //     title: "string",
  //     description: "dgfgfdsdgf",
  //     operationId: "Dfgdfg",
  //     price: 25000,
  //     locationLat: -31.527268731827387,
  //     locationLng: -68.53377754533042,
  //     createdAt: new Date("01/04/2022"),
  //     updatedAt: new Date("01/04/2022"),
  //     propertyInfo: {
  //       id: "cvbn",
  //       propertyId: "sfd",
  //       ambiences: 2,
  //       bathrooms: 1,
  //       bedrooms: 2,
  //       address: "Av. Vélez Sársfield 148",
  //       city: "San Juan",
  //       zone: "Rivadavia",
  //       surface: 18400,
  //       buildYear: 1998,
  //       orientation: "dfg",
  //     },
  //   },
  //   {
  //     id: "asdafvccx",
  //     typeId: "ds",
  //     type: { id: "avc", name: "Casa" },
  //     userId: "sds",
  //     title: "string",
  //     description: "dgfgfdsdgf",
  //     operationId: "Dfgdfg",
  //     price: 25000,
  //     locationLat: -31.53323840446941,
  //     locationLng: -68.48633982780866,
  //     createdAt: new Date("01/04/2022"),
  //     updatedAt: new Date("01/04/2022"),
  //     propertyInfo: {
  //       id: "cvbn",
  //       propertyId: "sfd",
  //       ambiences: 2,
  //       bathrooms: 1,
  //       bedrooms: 2,
  //       address: "Av. Libertador 238",
  //       city: "San Juan",
  //       zone: "Santa Lucía",
  //       surface: 18400,
  //       buildYear: 1998,
  //       orientation: "dfg",
  //     },
  //   },
  // ];

  return (
    <>
      <Head>
        <title>Panorama City</title>
        <meta name="description" content="Modern real estate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="min-h-screen bg-neutral-100 pt-[70px]">
        <div className="relative ">
          <section className="fixed z-10 h-[calc(100vh_-_70px)] w-2/5 ">
            <Map
              properties={propertiesList}
              setActiveProperty={setActiveProperty}
            />
          </section>
          <section className="ml-auto grid w-3/5 gap-4 p-4">
            <FilterNav
              // setShowFiltersModal={setShowFiltersModal}
              setPropertiesList={setPropertiesList}
              operations={operations}
              propertyTypes={propertyTypes}
              amenities={amenities}
            />
            <div className="grid grid-cols-auto-fit justify-items-center gap-4">
              {propertiesList.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  activeProperty={activeProperty}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const properties: Property[] = await prisma.property.findMany({
    include: { propertyType: true, propertyInfo: true },
  });

  const operations = await prisma.operation.findMany({});
  const propertyTypes = await prisma.propertyType.findMany({});
  const amenities = await prisma.amenity.findMany({});

  return {
    props: {
      properties: properties.map((property) => ({
        ...property,
        createdAt: property.createdAt.toISOString(),
        updatedAt: property.updatedAt.toISOString(),
      })),
      operations,
      propertyTypes,
      amenities,
    },
  };
};

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
