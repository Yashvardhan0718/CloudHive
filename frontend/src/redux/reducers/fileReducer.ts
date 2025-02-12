import {
  File,
  FileActionTypes,
  GET_ALL_FILES,
  UPLOAD_FILE,
  DELETE_FILE,
  START_GET_FILE_LOADING,
  STOP_GET_FILE_LOADING,
  START_UPLOAD_FILE_LOADING,
  STOP_UPLOAD_FILE_LOADING,
  TOGGLE_STARRED_FILE,
  REMOVE_ALL_FILE_DATA,
} from "../actions/fileActions";

export interface FileState {
  files: File[];
  loading: {
    GET_ALL_FILES: boolean;
    UPLOAD_FILE: boolean;
  };
}

const initialState: FileState = {
  files: [],
  loading: {
    GET_ALL_FILES: false,
    UPLOAD_FILE: false,
  },
};

export const fileReducer = (
  state: FileState = initialState,
  action: FileActionTypes
) => {
  switch (action.type) {
    case GET_ALL_FILES:
      return { ...state, files: action.payload.files };

    case UPLOAD_FILE:
      return {
        ...state,
        loading: false,
        files: [action.payload.file, ...state.files],
      };

    case DELETE_FILE:
      return {
        ...state,
        loading: false,
        files: state.files.filter(
          (file) => file.fileName !== action.payload.fileName
        ),
      };

    case TOGGLE_STARRED_FILE:
      return {
        ...state,
        files: state.files.map((file) => {
          if (file.fileName === action.payload.fileName)
            file.starred = action.payload.starred;
          return file;
        }),
      };
    case REMOVE_ALL_FILE_DATA:
      return {
        ...state,
        file: [],
      };
    case START_GET_FILE_LOADING:
      return { ...state, loading: { ...state.loading, GET_ALL_FILES: true } };
    case STOP_GET_FILE_LOADING:
      return { ...state, loading: { ...state.loading, GET_ALL_FILES: false } };
    case START_UPLOAD_FILE_LOADING:
      return { ...state, loading: { ...state.loading, UPLOAD_FILE: true } };
    case STOP_UPLOAD_FILE_LOADING:
      return { ...state, loading: { ...state.loading, UPLOAD_FILE: false } };
    default:
      return state;
  }
};
