import { Action } from "redux";

export const CREATE_ALERT = "CREATE_ALERT";
export const CLEAR_ALERT = "CLEAR_ALERT";
export type AlerTtype = "error" | "info" | "success" | "warning";

interface CreateAlertAction extends Action<typeof CREATE_ALERT> {
  payload: { message: string; type: AlerTtype };
}
interface CloseAlertAction extends Action<typeof CLEAR_ALERT> {}

export type AlertActions = CreateAlertAction | CloseAlertAction;

export const createAlert = ({
  message,
  type,
}: {
  message: string;
  type: AlerTtype;
}): CreateAlertAction => ({ type: CREATE_ALERT, payload: { message, type } });

export const closeAlert = (): CloseAlertAction => ({ type: CLEAR_ALERT });
