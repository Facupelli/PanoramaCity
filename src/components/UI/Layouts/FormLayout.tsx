import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  step?: number;
};

export default function FormLayout({ children, step }: Props) {
  return (
    <div className="grid border-t border-neutral-200 pb-10 font-barlow sm:grid-cols-7 sm:gap-10">
      <section className="border-r border-neutral-200 pt-10 sm:col-span-2">
        <ul className="flex h-full flex-col items-end justify-around px-10 font-semibold">
          <li className={`${step === 1 ? "text-m-black" : "text-neutral-400"}`}>
            Información Principal
          </li>
          <li className={`${step === 2 ? "text-m-black" : "text-neutral-400"}`}>
            Dirección
          </li>
          <li className={`${step === 3 ? "text-m-black" : "text-neutral-400"}`}>
            Caracteristicas
          </li>
          <li className={`${step === 4 ? "text-m-black" : "text-neutral-400"}`}>
            Comodidades
          </li>
          <li className={`${step === 5 ? "text-m-black" : "text-neutral-400"}`}>
            Imágenes
          </li>
        </ul>
      </section>
      <section className=" pt-10 sm:col-span-5">
        <div className="min-h-[550px] rounded-lg bg-white">
          <div className="grid gap-4 p-4 sm:p-8">{children}</div>
        </div>
      </section>
    </div>
  );
}
