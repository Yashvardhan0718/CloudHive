import { host } from "../utills/constants/backend";

export const DELETE_FILE_API_ENDPOINT = host + "/files";
export const GET_ALL_FILES_API_ENDPOINT = host + "/files";
export const GENERATE_PRESIGNED_URL_API_ENDPOINT =
  host + "/files/presigned-url";
export const UPLOAD_FILE_API_ENDPOINT = host + "/files/upload";
export const DOWNLOAD_FILE_API_ENDPOINT = host + "/files";
export const TOGGLE_STARRED_FILE_API_ENDPOINT = host + "/files/toggle-star";
