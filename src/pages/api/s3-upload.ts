import { type NextApiRequest } from "next";
import { APIRoute, sanitizeKey } from "next-s3-upload";

export interface S3ApiRequest extends NextApiRequest {
  // let's say our request accepts name and age property
  body: {
    propertyId: string;
  };
}

export default APIRoute.configure({
  key(req: S3ApiRequest, filename) {
    const propertyId: string = req.body.propertyId;
    return `images/${propertyId}/${sanitizeKey(filename)}`;
  },
});
