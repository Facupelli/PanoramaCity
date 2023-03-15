import { useS3Upload } from "next-s3-upload";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export default function ImagesUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickRef = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const [urls, setUrls] = useState<string[]>([]);
  const { uploadToS3 } = useS3Upload();

  const handleFilesChange = async ({ target }: { target: any }) => {
    console.log(target);
    const files: File[] = Array.from(target.files);

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (file) {
        const { url } = await uploadToS3(file, {
          endpoint: {
            request: {
              body: {
                propertyId: "sdf",
              },
            },
          },
        });

        setUrls((prev) => [...prev, url]);
      }
    }
  };

  return (
    <div className="grid gap-2">
      <input
        ref={inputRef}
        type="file"
        name="file"
        multiple={true}
        onChange={handleFilesChange}
        className="hidden"
      />
      <button
        onClick={handleClickRef}
        className="justify-self-start rounded bg-oliva p-2 font-semibold text-neutral-900"
      >
        Elegir archivos
      </button>

      <div className="grid grid-cols-auto-s3 gap-2 pt-4 ">
        {urls.map((url) => (
          <div
            className="relative aspect-video w-[250px] bg-neutral-50 "
            key={url}
          >
            <Image src={url} fill alt={url} style={{ objectFit: "contain" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
