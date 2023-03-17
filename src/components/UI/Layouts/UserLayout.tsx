import Link from "next/link";
import { useRouter } from "next/router";
import { type ReactNode } from "react";

type Props = { children: ReactNode };

export default function UserLayout({ children }: Props) {
  const router = useRouter();
  const userId = router.query.id as string;
  return (
    <div className="grid min-h-screen grid-cols-[170px_1fr]">
      <nav className="bg-s-blue px-4 py-10 font-barlow text-neutral-100 shadow">
        <ul className="grid gap-2">
          <li>
            <Link href={`/user/${userId}/post`}>Publicar inmueble</Link>
          </li>
          <li>
            <Link href={`/user/${userId}/properties`}>Mis inmuebles</Link>
          </li>
          <li>
            <Link href={`/user/${userId}/properties`}>Mis favoritos</Link>
          </li>
        </ul>
      </nav>
      <div className="w-full bg-neutral-200">{children}</div>
    </div>
  );
}
