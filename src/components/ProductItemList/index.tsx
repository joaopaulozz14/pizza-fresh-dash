import * as S from "./styles";
import { Down } from "../../assets/icons";
interface ProductItemListProps {
  children: React.ReactNode;
  onSelectTable: (data: number) => void;
}
const ProductItemList = ({ children, onSelectTable }: ProductItemListProps) => {
  return (
    <section>
      <S.ProductItemListHeader>
        <S.ProductItemListHeaderTitle>
          Escolha os sabores
        </S.ProductItemListHeaderTitle>
        <S.ProductItemListHeaderSelect
          onChange={({ target }) => onSelectTable(Number(target.value))}
          name="table"
          id="table"
        >
          <option value="default">
            Selecione a mesa{" "}
            <div>
              <Down />
            </div>
          </option>
          <option value="01">Mesa 01</option>
          <option value="02">Mesa 02</option>
        </S.ProductItemListHeaderSelect>
      </S.ProductItemListHeader>
      <S.ProductItemList>{children}</S.ProductItemList>
    </section>
  );
};

export default ProductItemList;
