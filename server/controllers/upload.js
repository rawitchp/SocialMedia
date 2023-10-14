import { handleUpload } from '../cloudinaryConfig.js';

export const uploadController = {
  async uploadImageToCloudinary(req, res) {
    try {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
      const cldRes = await handleUpload(dataURI);
      return res.status(200).send({ url: cldRes.url });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
