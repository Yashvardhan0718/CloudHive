import { ChangeThemeAction, CHANGE_THEME } from "../actions/themeActions";

export interface ThemeState {
  mode: "light" | "dark";
}

const initialState: ThemeState = {
  mode: "dark",
};

export const themeReducer = (
  state = initialState,
  action: ChangeThemeAction
) => {
  if (action.type === CHANGE_THEME) {
    let mode = "light";
    if (state.mode === "light") mode = "dark";
    return { ...state, mode };
  } else return state;
};
