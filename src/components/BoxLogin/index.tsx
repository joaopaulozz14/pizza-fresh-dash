import * as S from "./styles";
import logo from "../../assets/logo-patterns/logo.png";
import ButtonLarge from "../ButtonLarge";
import { HTMLAttributes, useState } from "react";

type BoxLoginType = HTMLAttributes<HTMLDivElement>;

export type BoxLoginProps = {
  onSubmitData: (data: { nickname: string; password: string }) => void;
  errorMessage: string;
} & BoxLoginType;

const BoxLogin = ({ onSubmitData, errorMessage }: BoxLoginProps) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassowrd] = useState("");

  const handleSubmit = () => {
    const data = { nickname, password };
    onSubmitData(data);
    //o onSubmitData envia de que forma para o backend?
  };

  return (
    <S.BoxLogin>
      <S.BoxLoginLogo>
        <S.BoxLoginLogoText>
          <span>Pizza</span>
          <span>Fresh</span>
        </S.BoxLoginLogoText>
        <S.BoxLoginLogoImage src={logo} />
      </S.BoxLoginLogo>
      <S.BoxLoginForm>
        <input
          type="text"
          placeholder="Email"
          value={nickname}
          onChange={({ target }) => setNickname(target.value)}
        />
        <input
          type="text"
          placeholder="Senha"
          value={password}
          onChange={({ target }) => setPassowrd(target.value)}
        />
        <ButtonLarge value="Entrar" type="button" onClick={handleSubmit} />
      </S.BoxLoginForm>
      {Boolean(errorMessage.length) && ( <S.BoxLoginError>{errorMessage}</S.BoxLoginError>)}
      {/**Como o if else, se existir o length dentro do errorMessage exiba a mensagem na tela. */}
    </S.BoxLogin>
  );
};

export default BoxLogin;
