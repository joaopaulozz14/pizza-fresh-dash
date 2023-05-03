import { LocalStorageHelper } from "./LocalStorageHelper";
import { LocalStorageKeys } from "../types/LocalStorageKeys";
import { RoutePath } from "../types/routes";
//import { useNavigate } from "react-router-dom";

export const Auth = {
  isAuth: (): boolean => {
    const token = LocalStorageHelper.get(LocalStorageKeys.TOKEN);
    const user = LocalStorageHelper.get(LocalStorageKeys.USER);
    //console.log("autenticado", token, user);
    //console.log(token);
    return token !== null && user !== null ? true : false;
  },
  logout: (): void => {
    LocalStorageHelper.clear();
    window.location.replace(RoutePath.LOGIN);
  },
};
