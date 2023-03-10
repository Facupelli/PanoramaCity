import { type ReactNode } from "react";
import XMark from "~/icons/XMark";

type Props = {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  setOpen: () => void;
};

export default function Modal({ title, children, isOpen, setOpen }: Props) {
  return (
    <>
      <dialog
        open={isOpen}
        className="fixed top-1/2 left-1/2 z-40 min-w-[700px] -translate-y-1/2 -translate-x-1/2 rounded border-none bg-transparent  p-0 font-barlow shadow-lg"
      >
        {title && (
          <div className="flex items-center justify-between rounded-t bg-oliva p-6">
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            <button onClick={setOpen} type="button" aria-label="close-button">
              <XMark />
            </button>
          </div>
        )}
        {children}
      </dialog>
      <div className="fixed top-0 left-0 z-30 h-screen w-full bg-neutral-900 opacity-50"></div>
    </>
  );
}
