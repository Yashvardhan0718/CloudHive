import {
  AlerTtype,
  AlertActions,
  CREATE_ALERT,
  CLEAR_ALERT,
} from "../actions/alertActions";

export interface AlertState {
  open: boolean;
  type: AlerTtype;
  message: string;
}

export const initialState: AlertState = {
  open: false,
  type: "info",
  message: "Provide your details",
};

export const alertReducer = (state = initialState, action: AlertActions) => {
  if (action.type === CREATE_ALERT) {
    const alert: AlertState = {
      open: true,
      type: action.payload.type,
      message: action.payload.message,
    };
    return { ...state, ...alert };
  } else if (action.type === CLEAR_ALERT) {
    return { ...state, open: false };
  } else return state;
};
