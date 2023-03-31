import { useS3Upload } from "next-s3-upload";
import Image from "next/image";
import {
  type Dispatch,
  type SetStateAction,
  useRef,
  type ChangeEvent,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type Props = {
  setUrls: Dispatch<SetStateAction<string[]>>;
  urls: string[];
  propertyAddress: string | undefined;
};

export default function ImagesUpload({
  setUrls,
  urls,
  propertyAddress,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickRef = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const { uploadToS3, files } = useS3Upload();

  const handleFilesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && propertyAddress) {
      const files: File[] = Array.from(e.target.files);

      const loadingToastId = toast.loading("Subiendo imágenes");
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file) {
          const { url } = await uploadToS3(file, {
            endpoint: {
              request: {
                body: {
                  propertyAddress: propertyAddress.split(" ").join(""),
                },
              },
            },
          });

          setUrls((prev) => [...prev, url]);
        }
      }
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div className="grid gap-2 ">
      <input
        ref={inputRef}
        type="file"
        name="file"
        multiple={true}
        onChange={handleFilesChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClickRef}
        className="justify-self-start rounded bg-s-blue p-2 font-semibold text-white"
      >
        Elegir archivos
      </button>

      <div className="grid grid-cols-auto-s3 gap-4 border-t border-neutral-200 pt-4">
        {urls.map((url, i) => (
          <div className="relative aspect-video w-[200px] rounded" key={url}>
            <Image
              src={url}
              fill
              alt={url}
              style={{ objectFit: "cover", borderRadius: 5 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
