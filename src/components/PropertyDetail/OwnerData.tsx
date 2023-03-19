import Image from "next/image";
import Whatsapp from "~/icons/Whatsapp";
import { type User } from "~/types/model";

type Props = {
  user: User;
};

export default function OwnerData({ user }: Props) {
  return (
    <aside className="absolute right-[96px] top-[40px] rounded bg-white p-6 font-barlow shadow-md">
      <p className="pb-2 text-sm text-neutral-500">publicado por</p>
      <div className="flex items-center gap-4">
        {user.image && (
          <div className="relative h-10 w-10 rounded-full">
            <Image
              src={user.image}
              fill
              alt="user_pic"
              style={{ borderRadius: "100%" }}
            />
          </div>
        )}
        <p className="font-semibold">{user.name}</p>
      </div>
      <div className="grid gap-4 pt-4">
        <div className="grid gap-1">
          <p>{user.email}</p>
          <p>
            teléfono: <b className="font-semibold">{user.phone}</b>
          </p>
        </div>
        {user.companyName && (
          <div className="flex items-center justify-center gap-2">
            {user.companyLogoUrl && (
              <div className="relative h-10 w-10 rounded-full">
                <Image
                  src={user.companyLogoUrl}
                  fill
                  alt="company_logo"
                  style={{ borderRadius: "100%" }}
                />
              </div>
            )}
            <p>{user.companyName}</p>
          </div>
        )}
        <button className="flex items-center justify-center gap-2 rounded-sm bg-green-500 py-1 text-white">
          enviar Whatsapp
          <Whatsapp />
        </button>
      </div>
    </aside>
  );
}
