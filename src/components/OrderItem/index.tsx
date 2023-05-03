import * as S from "./styles";
import { Trash } from "../../assets/icons";
import { ProductResponse } from "../../types/api/product";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
//import { OrderType } from "../../types/OrderType";
import { OrderItemType } from "../../types/OrderItemType";

type DivType = ButtonHTMLAttributes<HTMLDivElement>;

export type OrderItemProps = {
  product: ProductResponse;
  quantity: number;
  description?: string;
  canDelete?: Boolean;
  onRemoveItem?: () => void;
  onItemChange: (item: OrderItemType) => void;
} & DivType;

const OrderItem = ({
  product,
  quantity,
  description = "",
  onRemoveItem,
  onItemChange,
  canDelete = true,
  ...props
}: OrderItemProps) => {
  const [quantityState, setQuantityState] = useState(quantity);
  const [observationState, setObservationState] = useState(description);

  const handleObservation = (data: string) => {
    setObservationState(data);
  };

  const handleQuantity = (data: number) => {
    setQuantityState(data);
  };

  const handleChange = (quantityParam: number, observationParam: string) => {
    onItemChange({
      product: product,
      quantity: quantityParam,
      description: observationParam,
    });
  };

  useEffect(() => {
    handleObservation(description);
  }, [description]);

  useEffect(() => {
    handleQuantity(quantity);
  }, [quantity]);
  return (
    <S.OrderItem role="listitem" {...props}>
      <S.OrderItemLeft>
        <S.OrderItemLeftTop>
          <S.OrderItemProduct>
            <S.OrderItemProductImage
              src={product.image}
              alt={`Pizza de ${product.description}`}
            />
            <S.OrderItemProductDetails>
              <S.OrderItemProductDetailsName>
                {product.name}
              </S.OrderItemProductDetailsName>
              <S.OrderItemProductDetailsPrice>
                R$ {product.price}
              </S.OrderItemProductDetailsPrice>
            </S.OrderItemProductDetails>
          </S.OrderItemProduct>
          <S.OrderItemQuantity
            type="number"
            value={quantityState}
            onChange={({ target }) => {
              setQuantityState(Number(target.value));
              handleChange(Number(target.value), observationState);
              //Precisa passar os dois parâmetros porque a função está sendo chamada em dois lugares.
            }}
          />
        </S.OrderItemLeftTop>
        <S.OrderItemLeftObservation
          type="text"
          placeholder="Observações do pedido"
          value={observationState}
          onChange={({ target }) => {
            setObservationState(target.value);
            handleChange(quantityState, target.value);
          }}
        />
      </S.OrderItemLeft>

      <S.OrderItemRight>
        <S.OrderItemRightTotalPrice>
          R$ {Number(product.price * quantityState).toFixed(2)}
        </S.OrderItemRightTotalPrice>
        {canDelete && (
          <S.OrderItemRightTrash onClick={onRemoveItem}>
            <Trash />
          </S.OrderItemRightTrash>
        )}
        {/**O botão de deletar não está funcionando no OrderConfirmation */}
      </S.OrderItemRight>
    </S.OrderItem>
  );
};

export default OrderItem;
