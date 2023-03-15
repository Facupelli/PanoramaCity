import { APIRoute, sanitizeKey } from "next-s3-upload";

export default APIRoute.configure({
  key(req, filename) {
    let propertyId = req.body.propertyId;
    return `images/${propertyId}/${sanitizeKey(filename)}`;
  },
});
