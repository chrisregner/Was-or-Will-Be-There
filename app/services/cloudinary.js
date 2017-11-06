import localCloudinary from 'cloudinary'
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from 'constants/'

localCloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

const cloudinaryUploadWidget = global.cloudinary

export { cloudinaryUploadWidget }
export default localCloudinary
