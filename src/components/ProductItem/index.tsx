import * as S from "./styles";
import { ProductResponse } from "../../types/api/product";

type  ProductItemProps ={
  product: ProductResponse;
  onSelect: (data: ProductResponse) => void;
};
const ProductItem = ({product, onSelect}: ProductItemProps) => {
  return (
    <S.ProductItem role='listitem' onClick={() => onSelect(product)}>
        <S.ProductItemImage src={product.image} alt={product.description}/>
        <div>
            <S.ProductItemName>{product.name}</S.ProductItemName>
            <S.ProductItemPrice>{product.price}</S.ProductItemPrice>
            <S.ProductItemDescription>{product.description}</S.ProductItemDescription>
        </div>
    </S.ProductItem>
  );
}

export default ProductItem;
