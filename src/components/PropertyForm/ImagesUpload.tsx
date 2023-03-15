import { useS3Upload } from "next-s3-upload";
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

      <div>
        {urls.map((url, index) => (
          <div key={url}>
            File {index}: ${url}
          </div>
        ))}
      </div>
    </div>
  );
}
