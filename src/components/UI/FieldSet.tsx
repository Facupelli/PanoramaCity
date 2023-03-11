import { type ReactNode } from "react";
import { steps } from "~/pages/user/[id]";

type Props = {
  title: string;
  children: ReactNode;
  step?: number;
};

export default function Fieldset({ title, children, step }: Props) {
  return (
    <fieldset className="grid  gap-4 py-4  sm:grid-cols-6 sm:gap-0">
      <div className="sm:col-span-2">
        <legend className="font-regular text-xl font-medium">{title}</legend>
        <p className="pt-2 text-lg text-neutral-500">
          Paso <span className="font-semibold">{step}</span> de {steps}
        </p>
      </div>
      <div className="min-h-[500px] rounded-lg border border-neutral-200 bg-white sm:col-span-4">
        <div className="grid gap-4 p-8">{children}</div>
      </div>
    </fieldset>
  );
}
