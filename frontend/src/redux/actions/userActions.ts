import { Dispatch } from "redux";
import axios from "axios";
import {
  LOGIN_API_ENDPOINT,
  SIGNUP_API_ENDPOINT,
  GET_AND_UPDATE_USER_API_ENDPOINT,
} from "../../services/userApis";
import { getAllFiles } from "../actions/fileActions";
import { createAlert, AlertActions } from "./alertActions";
export interface User {
  name: string;
  email: string;
}

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const GET_USER = "GET_USER";
export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

interface StartLoading {
  type: typeof START_LOADING;
}

interface StopLoading {
  type: typeof STOP_LOADING;
}

interface LoginAction {
  type: typeof LOGIN;
  payload: {
    user: User;
    token: string;
  };
}

interface SignupAction {
  type: typeof SIGNUP;
  payload: {
    user: User;
    token: string;
  };
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface GetUserAction {
  type: typeof GET_USER;
  payload: {
    user: User;
    token: string;
  };
}

interface UpdateUserData {
  type: typeof UPDATE_USER_DATA;
  payload: {
    updateType: "name" | "password";
    updateData: string;
  };
}

export type AuthActionTypes =
  | LoginAction
  | SignupAction
  | LogoutAction
  | GetUserAction
  | StartLoading
  | StopLoading
  | AlertActions
  | UpdateUserData;

export const loginAsync =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: START_LOADING });
    try {
      const response = await axios.post(LOGIN_API_ENDPOINT, {
        email,
        password,
      });
      localStorage.setItem("token", response.data?.token);
      dispatch({
        type: LOGIN,
        payload: {
          user: { email, ...response.data.user },
          token: response.data?.token,
        },
      });
      dispatch(
        createAlert({ message: response.data?.message, type: "success" })
      );
      getAllFiles()(dispatch);
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      console.log(error);
      const errorMessage = error.response?.data.message || "An error occurred.";
      dispatch(createAlert({ message: errorMessage, type: "error" }));
    }
  };

export const signupUserAsync =
  ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: START_LOADING });
    try {
      console.log(name, email, password);
      const response = await axios.post(SIGNUP_API_ENDPOINT, {
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.data?.token);
      dispatch({
        type: SIGNUP,
        payload: {
          user: { name, email },
          token: response.data?.token,
        },
      });
      dispatch(
        createAlert({ message: response.data?.message, type: "success" })
      );
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      console.log(error);
      const errorMessage = error?.response.data.message || "An error occurred.";
      dispatch(createAlert({ message: errorMessage, type: "error" }));
    }
  };

export const getUserAsync =
  () => async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: START_LOADING });
    try {
      const token = localStorage.getItem("token")!;
      const response = await axios.get(GET_AND_UPDATE_USER_API_ENDPOINT, {
        headers: { "auth-token": token },
      });

      dispatch({
        type: GET_USER,
        payload: {
          user: response.data.user,
          token,
        },
      });
      dispatch(
        createAlert({ message: response.data?.message, type: "success" })
      );
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      localStorage.removeItem("token");
      console.log(error);
      const errorMessage = error?.response.data.message || "An error occurred.";
      dispatch(createAlert({ message: errorMessage, type: "error" }));
    }
  };

export const logOutUser = () => (dispatch: Dispatch<AuthActionTypes>) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
  dispatch(
    createAlert({ message: "Logged out successfully", type: "success" })
  );
};

export const updateUser =
  (
    updateType: "password" | "name",
    updateData: string,
    currentPassword: string
  ) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: START_LOADING });
    const token = localStorage.getItem("token");
    try {
      const responseData = {
        [updateType]: updateData,
        currentPassword,
      };
      const response = await axios.put(
        GET_AND_UPDATE_USER_API_ENDPOINT,
        responseData,
        {
          headers: { "auth-token": token },
        }
      );
      if (updateType === "name") {
        dispatch({
          type: UPDATE_USER_DATA,
          payload: { updateType: updateType, updateData: updateData },
        });
      }
      console.log(response);
      dispatch({ type: STOP_LOADING });
      dispatch(
        createAlert({ message: response.data.message, type: "success" })
      );
    } catch (error) {
      dispatch({ type: STOP_LOADING });
      const errorMessage =
        error?.response.data.message ||
        "An error occurred while updating user.";
      createAlert({ message: errorMessage, type: "error" });
    }
  };
