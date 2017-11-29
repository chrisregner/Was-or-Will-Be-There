const isIeOrEdge = document.documentMode || /Edge/.test(navigator.userAgent)

export const CLOUDINARY_CLOUD_NAME = 'chrisregner'
export const CLOUDINARY_API_KEY = '435326496857893'
export const CLOUDINARY_API_SECRET = 'BG2qWR2e6VTFXo14F3iTdd6dOZE'
export const CLOUDINARY_UPLOAD_PRESET = 'h64hlt8w'
export const createFlagUrl = countryId => isIeOrEdge
  ? `https://cdn.rawgit.com/hjnilsson/country-flags/master/png100px/${countryId}.png`
  : `https://cdn.rawgit.com/hjnilsson/country-flags/master/svg/${countryId}.svg`
export const createJournalThumbUrl = urlPart => `https://res.cloudinary.com/chrisregner/image/upload/c_limit,h_60,w_90/${urlPart}`
export const createJournalPhotoUrl = urlPart => `https://res.cloudinary.com/chrisregner/image/upload/${urlPart}`
