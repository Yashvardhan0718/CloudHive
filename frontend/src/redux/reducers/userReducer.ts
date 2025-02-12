import {
  LOGIN,
  LOGOUT,
  GET_USER,
  SIGNUP,
  START_LOADING,
  STOP_LOADING,
  UPDATE_USER_DATA,
  User,
  AuthActionTypes,
} from "../actions/userActions";

export interface userState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}
const initialState: userState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
};

export const userReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.updateType]: action.payload.updateData,
        },
      };
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };

    default:
      return state;
  }
};
