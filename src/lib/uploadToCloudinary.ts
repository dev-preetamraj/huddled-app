import axios from 'axios';

export const uploadCoverPictureToCloudinary = async (
  imageUri: string,
  type: string,
  email: string
) => {
  try {
    const name = email + 'cover_image.' + type.split('/')[1];
    const blobRes = await fetch(imageUri);
    const fileBlob = await blobRes.blob();
    const formData = new FormData();
    formData.append('file', fileBlob, name);
    formData.append('upload_preset', 'huddled_vt9lkofx');
    formData.append('api_key', '826228433212222');

    const response = await axios.post(
      'https://api-ap.cloudinary.com/v1_1/dxgl4eyhq/image/upload',
      formData,
      {
        headers: {
          secret_key: process.env.EXPO_PUBLIC_CLOUDINARY_SECRET_KEY,
        },
      }
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
