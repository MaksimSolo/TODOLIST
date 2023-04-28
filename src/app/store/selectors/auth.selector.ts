import {AppStateType} from "app/store/store";

export const selectIsLoggedIn = ({login}: AppStateType) => login.isLoggedIn