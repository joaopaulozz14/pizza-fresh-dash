import { Edit } from "../../assets/icons";
import * as S from "./styles";

const EditTable = () => {
  return (
    <S.EditTable>
      <>
        <S.EditTableDetails>
          <S.EditTableDetailsName>Número da mesa</S.EditTableDetailsName>
        </S.EditTableDetails>
        <S.EditTableAction>
          <Edit /> Editar
        </S.EditTableAction>
      </>

      <>
        <label htmlFor="tableId">Número da mesa</label>
        <S.EditForm id="tableId" type="number" placeholder="01" />
        <S.Deletar>Deletar Mesa</S.Deletar>
      </>
    </S.EditTable>
  );
};

export default EditTable;
