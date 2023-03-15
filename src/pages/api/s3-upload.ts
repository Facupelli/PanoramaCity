import { APIRoute, sanitizeKey } from "next-s3-upload";

export default APIRoute.configure({
  key(req, filename) {
    const propertyId: string = req.body.propertyId as string;
    return `images/${propertyId}/${sanitizeKey(filename)}`;
  },
});
