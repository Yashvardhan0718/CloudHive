import { Action } from "redux";
export const CHANGE_THEME = "CHANGE_THEME";

export interface ChangeThemeAction extends Action<typeof CHANGE_THEME> {}

export const changeTheme = (): ChangeThemeAction => ({ type: CHANGE_THEME });
