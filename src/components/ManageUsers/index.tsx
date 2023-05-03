import { Add } from "../../assets/icons";
import { HTMLAttributes, useEffect, useState } from "react";
import * as S from "./styles";
import EditUser from "../EditUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../types/QueryKey";
import { UserService } from "../../services/UserService";
import { User, UserResponse, UserUpdate } from "../../types/api/user";
import { ErrorResponse } from "../../types/api/error";

type ManageUsersType = HTMLAttributes<HTMLDivElement>;

type ManageUsersProps = {} & ManageUsersType;

const ManageUsers = ({ ...props }: ManageUsersProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const form = {
    id: "",
    nickname: "",
    name: "",
    password: "",
    confirmPassword: "",
    image: "",
  };
  const [userToAdd, setUserToAdd] = useState(form);
  const { data: usersData } = useQuery([QueryKey.USERS], UserService.getLista);

  //Add functions
  const add = useMutation(UserService.create, {
    onSuccess: (data: UserResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }
      const usersList = [...users, data as UserResponse];
      setUsers(usersList);
    },
    onError: () => {
      console.log("Erro ao criar novo usuário");
    },
  });
  const userIsValid = () =>
    Boolean(
      userToAdd.name.length &&
        userToAdd.nickname.length &&
        userToAdd.password.length &&
        userToAdd.confirmPassword.length &&
        userToAdd.image.length &&
        userToAdd.password === userToAdd.confirmPassword
    );
  const userFormatter = (toFormat: typeof form): User => ({
    nickname: toFormat.nickname,
    name: toFormat.name,
    password: toFormat.password,
    confirmPassword: toFormat.confirmPassword,
    image: toFormat.image,
  });

  //Delete functions
  const remove = useMutation(UserService.deleteById, {
    onSuccess: (data: UserResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const editedUsers = users.filter((i) => i.id !== data.id);
      setUsers(editedUsers);
    },
    onError: () => {
      console.log("Erro ao tentar deletar usuário");
    },
  });

  const onDeleteProduct = (user: UserResponse) => {
    remove.mutate(user.id);
    handleCancel();
  };
  //Update
  type usersToEditType = { id: string } & User;
  let userToEdit: usersToEditType[] = [];
  const update = useMutation(UserService.updateById, {
    onSuccess: (data: UserResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }
    },
    onError: () => {
      console.log("Erro ao tentar atualizar usuário");
    },
  });
  const onEditUser = (data: UserUpdate) => {
    setCancel(false);
    const existing = userToEdit.find((i) => i.id === data.id);
    const userFormatted = { ...data.user, id: data.id };

    userToEdit = existing
      ? userToEdit.map((i) => (i.id === existing.id ? userFormatted : i))
      : [...userToEdit, userFormatted];
    console.log(userToEdit);
  };

  // Handles Add, Save and Cancel
  const handleAddChange = (name: string, value: string) => {
    setUserToAdd({ ...userToAdd, [name]: value });
    console.log(userToAdd);
  };

  const handleSave = () => {
    const canAdd = userIsValid();
    const userFormatted = userFormatter(userToAdd);

    userToEdit.forEach((user) => update.mutate({ id: user.id, user }));

    if (canAdd) add.mutate(userFormatted);

    setTimeout(() => handleCancel(), 300);
    setUserToAdd(form);
    setIsAdding(false);
  };
  const handleCancel = () => {
    setCancel(true);
    setIsAdding(false);
    setTimeout(() => setCancel(false));
  };

  useEffect(() => {
    setUsers(usersData || []);
  }, [usersData]);

  return (
    <S.ManageUsers {...props}>
      <S.ManageUsersTitle>Gerenciar Usuários</S.ManageUsersTitle>
      <S.ManageUsersSub>
        <b>Usuários</b>
      </S.ManageUsersSub>
      <S.ManageUsersContent>
        {!isAdding ? (
          <S.ManageUsersContentAdd onClick={() => setIsAdding(!isAdding)}>
            <Add />
            <span>Adicionar Usuário</span>
          </S.ManageUsersContentAdd>
        ) : (
          <S.ManageUsersContentAdd>
            <S.EditForm
              type="text"
              placeholder="Nome"
              success={Boolean(userToAdd.name.length)}
              value={userToAdd.name}
              onChange={({ target }) => {
                handleAddChange("name", target.value);
              }}
            />
            <S.EditForm
              type="text"
              placeholder="Nome de usuário"
              success={Boolean(userToAdd.nickname.length)}
              value={userToAdd.nickname}
              onChange={({ target }) => {
                handleAddChange("nickname", target.value);
              }}
            />
            <S.EditForm
              type="password"
              min-minLength={6}
              placeholder="Senha"
              success={Boolean(userToAdd.password.length)}
              value={userToAdd.password}
              onChange={({ target }) => {
                handleAddChange("password", target.value);
              }}
            />
            <S.EditForm
              type="password"
              min-minLength={6}
              success={Boolean(
                userToAdd.confirmPassword.length &&
                  userToAdd.confirmPassword === userToAdd.password
              )}
              error={Boolean(
                userToAdd.confirmPassword.length &&
                  userToAdd.password.length &&
                  userToAdd.password !== userToAdd.confirmPassword
              )}
              placeholder="Confirmar Senha"
              onChange={({ target }) => {
                handleAddChange("confirmPassword", target.value);
              }}
            />
            <S.EditForm
              type="url"
              placeholder="Imagem"
              success={Boolean(userToAdd.image.length)}
              value={userToAdd.image}
              onChange={({ target }) => {
                handleAddChange("image", target.value);
              }}
            />
          </S.ManageUsersContentAdd>
        )}
        {users.map((user, index) => (
          <EditUser
            user={user}
            key={index}
            onCancel={handleCancel}
            onEdit={onEditUser}
            onDelete={onDeleteProduct}
          />
        ))}
      </S.ManageUsersContent>
      <S.ManageUsersActions>
        <S.ManageUsersActionsCancel onClick={() => handleCancel()}>
          Cancelar
        </S.ManageUsersActionsCancel>
        <S.ManageUsersActionsSave onClick={() => handleSave()}>
          Salvar Mudanças
        </S.ManageUsersActionsSave>
      </S.ManageUsersActions>
    </S.ManageUsers>
  );
};

export default ManageUsers;
