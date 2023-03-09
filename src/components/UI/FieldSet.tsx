import { type ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function Fieldset({ title, children }: Props) {
  return (
    <fieldset className="grid gap-4 pt-2 pb-4">
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}
