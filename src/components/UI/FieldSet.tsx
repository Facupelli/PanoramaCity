import { type ReactNode } from "react";
import { steps } from "~/pages/user/[id]";

type Props = {
  title: string;
  children: ReactNode;
  step: number;
};

export default function Fieldset({ title, children, step }: Props) {
  return (
    <fieldset className="grid min-h-[500px] gap-4 py-4 sm:grid-cols-6">
      <div className="sm:col-span-2">
        <legend className="font-regular text-xl font-medium">{title}</legend>
        <p className="pt-2 text-lg text-neutral-500">
          Paso <span className="font-semibold">{step}</span> de {steps}
        </p>
      </div>
      <div className="grid gap-4 sm:col-span-4">{children}</div>
    </fieldset>
  );
}
