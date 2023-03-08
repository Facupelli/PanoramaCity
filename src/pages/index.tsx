import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { api } from "~/utils/api";
import NavBar from "~/components/NavBar";
import MapContainer from "~/components/Map/MapContainer";
import PropertyCard from "~/components/PropertyCard/PropertyCard";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [activeProperty, setActiveProperty] = useState<string>("");

  const properties = [
    {
      id: "sdasd",
      typeId: "ds",
      type: { id: "asd", name: "Departamento" },
      userId: "sds",
      description: "dgfgfdsdgf",
      operation: "Dfgdfg",
      price: 8500,
      locationLat: -31.52471936821179,
      locationLng: -68.5823669732075,
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
        orientation: "dfg",
      },
    },
    {
      id: "sdytrrtyasd",
      typeId: "ds",
      type: { id: "afd", name: "Departamento" },
      userId: "sds",
      description: "dgfgfdsdgf",
      operation: "Dfgdfg",
      price: 11000,
      locationLat: -31.521715506516014,
      locationLng: -68.58110400550659,
      propertyInfo: {
        id: "ert",
        propertyId: "sfd",
        ambiences: 3,
        bathrooms: 1,
        bedrooms: 2,
        address: "Sergio Boggian, 543",
        city: "San Juan",
        zone: "Rivadavia",
        surface: 23000,
        buildYear: 2015,
        orientation: "dfg",
      },
    },
    {
      id: "ghdfd",
      typeId: "ds",
      type: { id: "avc", name: "Casa" },
      userId: "sds",
      description: "dgfgfdsdgf",
      operation: "Dfgdfg",
      price: 54000,
      locationLat: -31.529170907268195,
      locationLng: -68.5197871440546,
      propertyInfo: {
        id: "cvbn",
        propertyId: "sfd",
        ambiences: 4,
        bathrooms: 1,
        bedrooms: 2,
        address: "Obispo Slaguero 585",
        city: "San Juan",
        zone: "Rivadavia",
        surface: 9200,
        buildYear: 1998,
        orientation: "dfg",
      },
    },
    {
      id: "asdafvccx",
      typeId: "ds",
      type: { id: "avc", name: "Casa" },
      userId: "sds",
      description: "dgfgfdsdgf",
      operation: "Dfgdfg",
      price: 25000,
      locationLat: -31.527268731827387,
      locationLng: -68.53377754533042,
      propertyInfo: {
        id: "cvbn",
        propertyId: "sfd",
        ambiences: 2,
        bathrooms: 1,
        bedrooms: 2,
        address: "Av. Vélez Sársfield 148",
        city: "San Juan",
        zone: "Rivadavia",
        surface: 18400,
        buildYear: 1998,
        orientation: "dfg",
      },
    },
  ];

  return (
    <>
      <Head>
        <title>Panorama City</title>
        <meta name="description" content="Modern real estate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="min-h-screen bg-neutral-100 pt-[70px]">
        <section className="relative ">
          <div className="fixed z-10 h-[calc(100vh_-_70px)] w-2/5 ">
            <MapContainer
              properties={properties}
              setActiveProperty={setActiveProperty}
              activeProperty={activeProperty}
            />
          </div>
          <section className="ml-auto grid w-3/5 grid-cols-auto-fit justify-items-center gap-4 p-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </section>
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
