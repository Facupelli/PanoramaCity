import { useS3Upload } from "next-s3-upload";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function ImagesUpload() {
  const [urls, setUrls] = useState([]);
  const { uploadToS3 } = useS3Upload();

  const handleFilesChange = async ({ target }) => {
    const files = Array.from(target.files);

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const { url } = await uploadToS3(file, {
        endpoint: {
          request: {
            body: {
              propertyId: "sdf",
            },
          },
        },
      });

      setUrls((current) => [...current, url]);
    }
  };

  return (
    <div className="grid gap-2">
      <input
        type="file"
        name="file"
        multiple={true}
        onChange={handleFilesChange}
      />

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
