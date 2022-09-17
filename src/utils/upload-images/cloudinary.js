import { v2 as cloudinary } from 'cloudinary';

import env from '../env/env-variables.js';

cloudinary.config({
  cloud_name: env.cloudName,
  api_key: env.cloudPublicKey,
  api_secret: env.cloudSecretKey,
  secure: true,
});

export async function uploadImage(filepath, folder) {
  return await cloudinary.uploader.upload(filepath, {
    folder: `ecom-coderHouse/${folder}`,
  });
}

export async function deleteImage(publicId) {
  await cloudinary.uploader.destroy(publicId);
}
