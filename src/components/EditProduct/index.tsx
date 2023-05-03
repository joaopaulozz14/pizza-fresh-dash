import { useEffect, useState } from "react";
import { Edit } from "../../assets/icons";
import { ProductResponse } from "../../types/api/product";
import * as S from "./styles";

interface ProductDataProps {
  product: ProductResponse;
  onEdit: (data: ProductResponse) => void;
  onCancel: boolean;
  onDelete: (data: ProductResponse) => void;
}
const EditProduct = ({
  product,
  onEdit,
  onCancel,
  onDelete,
}: ProductDataProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = {
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
  };
  const [state, setState] = useState(form);

  const productEditFormatter = (toFormat: typeof form): ProductResponse => ({
    id: product.id,
    name: toFormat.name,
    description: toFormat.description,
    price: toFormat.price,
    image: toFormat.image,
  });

  const onEditClick = () => {
    setIsEditing(true);
    const productFormatted = productEditFormatter(state);
    onEdit(productFormatted);
  };

  const handleChange = (name: string, value: string | number) => {
    setState({ ...state, [name]: value });
    const productFormatted = productEditFormatter(state);
    onEdit(productFormatted);
  };

  useEffect(() => {
    setIsEditing(false);
  }, [onCancel]);
  return (
    <S.EditProduct>
      {!isEditing ? (
        <>
          <S.EditProductImage src={product.image} alt="Pizza de..." />
          <S.EditProductDetails>
            <S.EditProductDetailsName>{product.name}</S.EditProductDetailsName>
            <S.EditProductDetailsPrice>
              R$ {product.price}
            </S.EditProductDetailsPrice>
            <S.EditProductDetailsDescription>
              {product.description}
            </S.EditProductDetailsDescription>
          </S.EditProductDetails>

          <S.EditProductAction onClick={() => onEditClick()}>
            <Edit /> Editar
          </S.EditProductAction>
        </>
      ) : (
        <>
          <S.EditFormGroup>
            <S.EditForm
              type="text"
              placeholder="Título"
              value={state.name || ""}
              success={Boolean(state.name.length)}
              onChange={({ target }) => {
                handleChange("name", target.value);
              }}
            />
            <S.EditForm
              type="text"
              placeholder="Descrição"
              success={Boolean(state.description.length)}
              value={state.description || ""}
              onChange={({ target }) => {
                handleChange("description", target.value);
              }}
            />
            <S.EditForm
              type="number"
              placeholder="Preço"
              success={Boolean(state.price.toString().length)}
              value={state.price || ""}
              onChange={({ target }) => {
                handleChange("number", target.value);
              }}
            />
            <S.EditForm
              type="url"
              placeholder="Imagem"
              success={Boolean(state.image.length)}
              value={state.image || ""}
              onChange={({ target }) => handleChange("image", target.value)}
            />
            <S.Delete onClick={() => onDelete(product)}>Deletar</S.Delete>
          </S.EditFormGroup>
        </>
      )}
    </S.EditProduct>
  );
};

export default EditProduct;
