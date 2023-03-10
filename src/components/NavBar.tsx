import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  const { data: sessionData } = useSession();

  return (
    <nav className="fixed z-20 w-full bg-marino ">
      <div className="flex h-nav items-center justify-between px-8">
        <Link
          href="/"
          className="font-regular font-archivo text-2xl text-white"
        >
          Panorama City
        </Link>
        {sessionData ? (
          <Link href={`/user/${sessionData.user.id}`} className="text-oliva">
            {sessionData.user.name}
          </Link>
        ) : (
          <div className="flex gap-4 font-barlow text-sm text-white">
            <button
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              Iniciar Sesión
            </button>
            <button className="rounded border border-oliva p-2 text-oliva">
              Registrarse
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
