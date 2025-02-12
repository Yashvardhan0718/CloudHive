import { Dispatch } from "redux";
import axios from "axios";
import { createAlert } from "./alertActions";
import { AlertActions } from "./alertActions";
import {
  GET_ALL_FILES_API_ENDPOINT,
  GENERATE_PRESIGNED_URL_API_ENDPOINT,
  UPLOAD_FILE_API_ENDPOINT,
  DOWNLOAD_FILE_API_ENDPOINT,
  DELETE_FILE_API_ENDPOINT,
  TOGGLE_STARRED_FILE_API_ENDPOINT,
} from "../../services/fileApis";

export const GET_ALL_FILES = "GET_ALL_FILES";
export const UPLOAD_FILE = "UPLOAD_FILE";
export const DELETE_FILE = "DELETE_FILE";
export const START_GET_FILE_LOADING = "START_GET_FILE_LOADING";
export const STOP_GET_FILE_LOADING = "STOP_GET_FILE_LOADING";
export const START_UPLOAD_FILE_LOADING = "START_UPLOAD_FILE_LOADING";
export const STOP_UPLOAD_FILE_LOADING = "STOP_UPLOAD_FILE_LOADING";
export const TOGGLE_STARRED_FILE = "TOGGLE_STARRED_FILE";
export const REMOVE_ALL_FILE_DATA = "REMOVE_ALL_FILE_DATA";

export interface File {
  id: number;
  fileName: string;
  contentType: string;
  starred: boolean;
  updatedAt: string;
  createdAt: string;
}

interface GetAllFiles {
  type: typeof GET_ALL_FILES;
  payload: {
    files: File[];
  };
}
interface UploadFile {
  type: typeof UPLOAD_FILE;
  payload: {
    file: File;
  };
}
interface DeleteFile {
  type: typeof DELETE_FILE;
  payload: {
    fileName: string;
  };
}

interface ToggleStarredFile {
  type: typeof TOGGLE_STARRED_FILE;
  payload: {
    fileName: string;
    starred: boolean;
  };
}

interface RemoveAllFileData {
  type: typeof REMOVE_ALL_FILE_DATA;
}

interface StartGetFileLoading {
  type: typeof START_GET_FILE_LOADING;
}
interface StopGetFileLoading {
  type: typeof STOP_GET_FILE_LOADING;
}

interface StartUploadFileLoading {
  type: typeof START_UPLOAD_FILE_LOADING;
}
interface StopUploadFileLoading {
  type: typeof STOP_UPLOAD_FILE_LOADING;
}

export type FileActionTypes =
  | GetAllFiles
  | UploadFile
  | DeleteFile
  | StartGetFileLoading
  | StopGetFileLoading
  | StartUploadFileLoading
  | StopUploadFileLoading
  | AlertActions
  | ToggleStarredFile
  | RemoveAllFileData;

export const getAllFiles = () => async (dispatch: Dispatch) => {
  dispatch({ type: START_GET_FILE_LOADING });
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    const response = await axios.get(GET_ALL_FILES_API_ENDPOINT, {
      headers: { "auth-token": token },
    });
    const files = response.data.files;
    dispatch({ type: GET_ALL_FILES, payload: { files } });
    dispatch(
      createAlert({ message: "Files fetched successfully", type: "success" })
    );
    dispatch({ type: STOP_GET_FILE_LOADING });
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response.data.message || "An error occurred while fetching files";
    dispatch(createAlert({ message: errorMessage, type: "error" }));
    dispatch({ type: STOP_GET_FILE_LOADING });
  }
};

export const uploadFile =
  (fileName: string, fileType: string, file: object) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: START_UPLOAD_FILE_LOADING });
    const token = localStorage.getItem("token");
    if (!token || !fileName || !fileType || !file) return;
    try {
      const payloadData = { fileName, fileType };
      const response1 = await axios.post(
        GENERATE_PRESIGNED_URL_API_ENDPOINT,
        payloadData,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      const preSignedUrl = response1.data.s3PreSignedUrl;
      await axios.put(preSignedUrl, file);

      const response2 = await axios.post(
        UPLOAD_FILE_API_ENDPOINT,
        payloadData,
        {
          headers: { "auth-token": token },
        }
      );

      dispatch({ type: UPLOAD_FILE, payload: { file: response2.data.file } });
      dispatch(
        createAlert({ message: "File uploaded successfully", type: "success" })
      );
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response.data.message || "Error while uploading file";
      dispatch(createAlert({ message: errorMessage, type: "error" }));
      dispatch({ type: STOP_UPLOAD_FILE_LOADING });
    }
  };

export const downloadFile =
  (fileName: string) => async (dispatch: Dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.get(
        `${DOWNLOAD_FILE_API_ENDPOINT}/${fileName}`,
        {
          headers: { "auth-token": token },
        }
      );
      const url = response.data.url;
      const a = document.createElement("a");
      a.href = url;
      a.click();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response.data.message || "Error while downloading file";
      dispatch(createAlert({ message: errorMessage, type: "error" }));
    }
  };

export const deleteFile = (fileName: string) => async (dispatch: Dispatch) => {
  const token = localStorage.getItem("token");
  if (!token || !fileName) return;
  try {
    await axios.delete(`${DELETE_FILE_API_ENDPOINT}/${fileName}`, {
      headers: { "auth-token": token },
    });
    dispatch({ type: DELETE_FILE, payload: { fileName: fileName } });
    dispatch(
      createAlert({ message: "File deleted successfully", type: "success" })
    );
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response.data.message || "Error while deleting file";
    dispatch(createAlert({ message: errorMessage, type: "error" }));
  }
};

export const toggleStarredFile =
  (fileName: string, star: boolean) => async (dispatch: Dispatch) => {
    const token = localStorage.getItem("token");
    if (!token || !fileName) return;
    try {
      await axios.put(
        `${TOGGLE_STARRED_FILE_API_ENDPOINT}/${fileName}`,
        {},
        {
          headers: { "auth-token": token },
        }
      );
      star = !star;
      dispatch({
        type: TOGGLE_STARRED_FILE,
        payload: { fileName, starred: star },
      });
      const message = star
        ? "File starred successfully"
        : "File unstarred successfully";
      dispatch(createAlert({ message, type: "success" }));
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response.data.message || "Error while toggling starred file";
      dispatch(createAlert({ message: errorMessage, type: "error" }));
    }
  };

export const removeAllFileData = () => ({
  type: REMOVE_ALL_FILE_DATA,
});
