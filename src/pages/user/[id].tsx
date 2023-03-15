import { type NextPage } from "next";
import Head from "next/head";

import NavBar from "~/components/NavBar";
import UserLayout from "~/components/UI/Layouts/UserLayout";

const UserDetail: NextPage = () => {
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
          <div />
        </UserLayout>
      </main>
    </>
  );
};

export default UserDetail;
