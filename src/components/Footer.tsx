import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full justify-center bg-gradient-to-b from-neutral-100 to-neutral-400 py-6 font-barlow ">
      <Link href="/search" className="font-medium">
        Panorama City
      </Link>
    </footer>
  );
}
