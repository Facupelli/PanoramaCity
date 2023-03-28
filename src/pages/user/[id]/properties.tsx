import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { type ParsedUrlQuery } from "querystring";
import { prisma } from "~/server/db";

import NavBar from "~/components/NavBar";
import PropertyCard from "~/components/PropertyCard/PropertyCard";
import UserLayout from "~/components/UI/Layouts/UserLayout";

import { type User } from "~/types/model";

type Props = {
  user: User;
};

const UserPropeties: NextPage<Props> = ({ user }: Props) => {
  return (
    <>
      <Head>
        <title>Panorama City</title>
        <meta name="description" content="Modern real estate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="min-h-screen bg-neutral-100 pt-[70px]">
        <UserLayout>
          <section className="grid grid-cols-auto-fit justify-items-center gap-10 p-10">
            {user.properties?.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </section>
        </UserLayout>
      </main>
    </>
  );
};

export default UserPropeties;

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      properties: {
        include: {
          operation: true,
          propertyInfo: true,
          propertyType: true,
        },
      },
    },
  });

  return {
    props: {
      user: {
        ...user,
        emailVerified: user?.emailVerified
          ? user.emailVerified.toISOString()
          : "",
        properties: user?.properties.map((property) => ({
          ...property,
          createdAt: property.createdAt.toISOString(),
          updatedAt: property.updatedAt.toISOString(),
        })),
      },
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
