import { bucket } from "../firebase.js";
import { Readable } from "stream";

export const getImageUrl = async ({ buffer, originalname, mimetype }) => {
  const fileName = `${Date.now()}-${originalname}`;
  const file = bucket.file(fileName);

  const stream = Readable.from(buffer);

  const streamUpload = stream.pipe(
    file.createWriteStream({
      metadata: {
        contentType: mimetype,
      },
    })
  );

  await new Promise((resolve, reject) => {
    streamUpload.on("finish", () => resolve());
    streamUpload.on("error", reject);
  });

  await file.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};
