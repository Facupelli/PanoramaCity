import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import LogOut from "~/icons/LogOut";

export default function NavBar() {
  const { data: sessionData } = useSession();

  return (
    <nav className="fixed z-20 w-full bg-m-blue ">
      <div className="flex h-nav items-center justify-between px-8">
        <Link
          href="/"
          className="font-regular font-archivo text-2xl text-m-white"
        >
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
    </nav>
  );
}
