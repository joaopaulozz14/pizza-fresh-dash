import { useEffect, useState } from "react";
import { Edit } from "../../assets/icons";
import { User, UserResponse, UserUpdate } from "../../types/api/user";
import * as S from "./styles";

interface EditUserProps {
  user: UserResponse;
  onCancel: () => void;
  onEdit: (data: UserUpdate) => void;
  onDelete: (data: UserResponse) => void;
}

const EditUser = ({ user, onCancel, onDelete, onEdit }: EditUserProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = {
    nickname: user.nickname,
    name: user.name,
    image: user.image,
    password: "",
    confirmPassword: "",
  };
  const [state, setState] = useState(form);

  const userFormatter = (toFormat: typeof form): User => ({
    nickname: toFormat.nickname,
    name: toFormat.name,
    password: toFormat.password,
    confirmPassword: toFormat.confirmPassword,
    image: toFormat.image,
  });

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (name: string, value: string) => {
    setState({ ...state, [name]: value });
    const userFormatted = { id: user.id, user: userFormatter(state) };
    onEdit(userFormatted);
  };
  useEffect(() => {
    setIsEditing(false);
  }, [onCancel]);
  return (
    <S.EditUser>
      {!isEditing ? (
        <>
          <S.EditUserDetails>
            <S.EditUserDetailsImageWrap>
              <S.EditUserDetailsImage src={user.image} alt="Foto de..." />
            </S.EditUserDetailsImageWrap>
            <S.EditUserDetailsTitle>{user.name}</S.EditUserDetailsTitle>
            <S.EditUserDetailsText>
              <b>usuário: </b> {user.nickname}
            </S.EditUserDetailsText>
          </S.EditUserDetails>

          <S.EditUserAction onClick={() => onClickEdit()}>
            <Edit /> Editar
          </S.EditUserAction>
        </>
      ) : (
        <S.EditFormGroup>
          <S.EditForm
            type="text"
            placeholder="Nome"
            value={state.name}
            onChange={({ target }) => {
              handleChange("name", target.value);
            }}
          />
          <S.EditForm
            type="text"
            placeholder="Nome de usuário"
            value={state.nickname}
            onChange={({ target }) => {
              handleChange("nickname", target.value);
            }}
          />
          <S.EditForm
            type="password"
            placeholder="Senha"
            onChange={({ target }) => {
              handleChange("password", target.value);
            }}
          />
          <S.EditForm
            type="password"
            placeholder="Confirmar Senha"
            onChange={({ target }) => {
              handleChange("confirmPassword", target.value);
            }}
          />
          <S.EditForm
            type="url"
            placeholder="Imagem"
            value={state.image}
            onChange={({ target }) => {
              handleChange("image", target.value);
            }}
          />
          <S.Delete onClick={() => onDelete(user)}>Deletar</S.Delete>
        </S.EditFormGroup>
      )}
    </S.EditUser>
  );
};

export default EditUser;
