import * as S from "./styles";
import BoxLogin from "../../components/BoxLogin";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../types/routes";
import { useState } from "react";
import { AuthService } from "../../services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { Login as LoginData, LoginResponse } from "../../types/api/login";
import { ErrorResponse } from "../../types/api/error";
import { LocalStorageHelper } from "../../helpers/LocalStorageHelper";
import { LocalStorageKeys } from "../../types/LocalStorageKeys";
import { User } from "../../types/api/user";
const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const mutation = useMutation(AuthService.login, {
    onSuccess: (data: LoginResponse & ErrorResponse) => {
      if (data.statusCode) {
        setErrorMessage(data.message);
        return;
      }
      if (data.token && data.user) {
        LocalStorageHelper.set<string>(LocalStorageKeys.TOKEN, data.token);
        LocalStorageHelper.set<User>(LocalStorageKeys.USER, data.user);
        //console.log("autenticado");
        navigate("/");
      }
      setErrorMessage("Digite o nickname e senha novamente");
    },

    onError: () => {
      setErrorMessage("Ocorreu um erro na requisição");
    },
  });

  const handleSubmit = (data: LoginData) => {
    mutation.mutate(data);
    setErrorMessage("");
  };

  return (
    <S.Login>
      <S.LoginContent>
        <BoxLogin onSubmitData={handleSubmit} errorMessage={errorMessage} />
      </S.LoginContent>
    </S.Login>
  );
};

export default Login;
