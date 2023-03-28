import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full justify-center bg-neutral-300 py-6 font-barlow ">
      <Link href="/search" className="font-medium">
        Panorama City
      </Link>
    </footer>
  );
}
