import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import LogOut from "~/icons/LogOut";

export default function NavBar({ color }: { color?: string }) {
  const { data: sessionData } = useSession();

  return (
    <nav
      className={`fixed z-20 w-full transition-all duration-300 ease-in-out ${
        color === "transparent" ? "bg-transparent" : "bg-m-blue"
      }  `}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex h-nav items-center justify-between px-6 xl:px-0">
          <Link
            href="/"
            className="font-archivo flex items-center gap-4 font-philo text-m-white sm:text-2xl"
          >
            <div className="relative h-[70px] w-[70px]">
              <Image src="/logo-solo.svg" alt="asd" fill />
            </div>
            Panorama City
          </Link>
          {sessionData ? (
            <div className="flex items-center gap-4">
              <Link
                href={`/user/${sessionData.user.id}`}
                className="text-m-white"
              >
                {sessionData.user.name}
              </Link>
              <button aria-label="log-out-btn" onClick={() => void signOut()}>
                <LogOut />
              </button>
            </div>
          ) : (
            <div className="flex gap-4 font-barlow text-sm text-white">
              <button onClick={() => void signIn("google")}>
                Iniciar Sesión
              </button>
              <button className="rounded border border-t-blue p-2 text-t-blue">
                Registrarse
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
