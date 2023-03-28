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
import { toast } from "react-hot-toast";

type Props = {
  properties: Property[];
  operations: Operation[];
  propertyTypes: PropertyType[];
  amenities: Amenity[];
};

const Search: NextPage<Props> = ({
  properties,
  operations,
  propertyTypes,
  amenities,
}: Props) => {
  const [mobileViewList, setMobileViewList] = useState(true);

  const hasMounted = useRef(false);

  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
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
        filters.location ||
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
              toast.error("No encontramos propiedades con esos filtros!", {
                duration: 5000,
              });
            },
            onError(err) {
              console.log(err);
              toast.error(
                "Algo salió mal! Por favor intenta de nuevo más tarde."
              );
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

  return (
    <>
      <Head>
        <title>Panorama City</title>
        <meta name="description" content="Modern real estate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="min-h-screen bg-neutral-100 pt-[70px] font-barlow">
        <div className="relative flex flex-col-reverse sm:block">
          <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 rounded bg-white py-2 px-4 font-medium shadow sm:hidden">
            <button
              onClick={() => {
                setMobileViewList(!mobileViewList);
                console.log("clik");
              }}
            >
              {mobileViewList ? "Mapa" : "Lista"}
            </button>
          </div>

          {activeProperty && (
            <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 rounded py-2 px-4 font-medium shadow sm:hidden">
              <PropertyCard property={activeProperty} small />
            </div>
          )}

          <section
            className={`h-[calc(100vh_-_126px)] sm:fixed sm:z-10 sm:h-[calc(100vh_-_70px)] sm:w-2/5 ${
              mobileViewList ? "hidden sm:block" : "block"
            }`}
          >
            <Map
              properties={propertiesList}
              setActiveProperty={setActiveProperty}
            />
          </section>
          <section
            className={`grid h-14 gap-4 p-4 sm:ml-auto sm:block sm:w-3/5`}
          >
            <FilterNav
              setPropertiesList={setPropertiesList}
              operations={operations}
              propertyTypes={propertyTypes}
              amenities={amenities}
            />
            <div
              className={`grid grid-cols-auto-fit justify-items-center gap-4 ${
                mobileViewList ? "block" : "hidden sm:block"
              }`}
            >
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

export default Search;

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
