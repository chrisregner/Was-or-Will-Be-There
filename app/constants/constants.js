export const CLOUDINARY_CLOUD_NAME = 'chrisregner'
export const CLOUDINARY_API_KEY = '435326496857893'
export const CLOUDINARY_API_SECRET = 'BG2qWR2e6VTFXo14F3iTdd6dOZE'
export const CLOUDINARY_UPLOAD_PRESET = 'h64hlt8w'
export const COUNTRIES_JSON_URL = 'https://cdn.rawgit.com/hjnilsson/country-flags/master/countries.json'
export const createFlagUrl = countryId => `https://cdn.rawgit.com/hjnilsson/country-flags/master/svg/${countryId}.svg`
export const createJournalThumbUrl = urlPart => `http://res.cloudinary.com/chrisregner/image/upload/c_limit,h_60,w_90/${urlPart}`
export const createJournalPhotoUrl = urlPart => `http://res.cloudinary.com/chrisregner/image/upload/${urlPart}`
