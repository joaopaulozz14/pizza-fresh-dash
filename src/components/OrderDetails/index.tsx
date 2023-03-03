import * as S from "./styles";
import ButtonToggle from "../ButtonToggle";
import OrderItemList from "../OrderItemList";
import ButtonLarge from "../ButtonLarge";
import OrderItem from "../OrderItem";
import { HTMLAttributes, useEffect, useState } from "react";
import { OrderItemType } from "../../types/OrderItemType";
import { OrderType } from "../../types/OrderType";

type OrderDetailsType = HTMLAttributes<HTMLDivElement>;

type OrderDetailsProps = {
  orders: OrderItemType[];
  onOrdersChange: (orders: OrderItemType[]) => void;
  onProceedToPayment: () => void;
  activeOrderType: OrderType;
  onRemoveItem: (id: string) => void;
  onChangeActiveOrderType: (data: OrderType) => void;
  selectedTable?: number | string;
} & OrderDetailsType;

const OrderDetails = ({
  orders,
  onOrdersChange,
  onProceedToPayment,
  activeOrderType,
  onRemoveItem,
  onChangeActiveOrderType,
  selectedTable,
}: OrderDetailsProps) => {
  const price = orders
    .map((i) => i.product.price * i.quantity)
    .reduce((a, b) => a + b, 0);
  //"a" é o acumulador, "b" é o número e "0" o valor inicial passado;
  const [priceState, setPriceState] = useState(price);

  const handleChange = (data: OrderItemType) => {
    const list = orders.map((item) =>
      item.product.id === data.product.id ? data : item
    );
    onOrdersChange(list);
  };

  const disabledButton =
    !Boolean(orders.length) ||
    !Boolean(selectedTable) ||
    selectedTable === "default";

  useEffect(() => {
    setPriceState(price);
  }, [orders, price]);
  return (
    <S.OrderDetails>
      <S.OrderDetailsTitle>Detalhes do pedido</S.OrderDetailsTitle>
      <S.OrderDetailsButtonGroup>
        <ButtonToggle
          value="Comer no local"
          active={activeOrderType === OrderType.COMER_NO_LOCAL}
          onClick={() => onChangeActiveOrderType(OrderType.COMER_NO_LOCAL)}
        />
        <ButtonToggle
          value="P/Viagem"
          active={activeOrderType === OrderType.PARA_VIAGEM}
          onClick={() => onChangeActiveOrderType(OrderType.PARA_VIAGEM)}
        />
        <ButtonToggle
          value="Delivery"
          active={activeOrderType === OrderType.DELIVERY}
          onClick={() => onChangeActiveOrderType(OrderType.DELIVERY)}
        />
      </S.OrderDetailsButtonGroup>

      <S.OrderDetailsList>
        <OrderItemList
          header={
            <S.OrderDetailsListTitle>
              <h4>Item</h4>
              <h4>Qtd</h4>
              <h4>Preço</h4>
            </S.OrderDetailsListTitle>
          }
          list={
            Boolean(orders.length) ? (
              orders.map((item, index) => (
                <OrderItem
                  product={item.product}
                  quantity={item.quantity}
                  observation={item.observation}
                  onRemoveItem={() => onRemoveItem(item.product.id)}
                  onItemChange={handleChange}
                  key={`OrderDetails${index}`}
                />
              ))
            ) : (
              <S.OrderDetailsListGap />
            )
          }
          footer={
            <S.OrderDetailsListFooter>
              <S.OrderDetailsListFooterRow>
                <span>Subtotal</span>
                <span>R${priceState.toFixed(2)}</span>
              </S.OrderDetailsListFooterRow>
              {(!Boolean(selectedTable) || selectedTable === "default") && (
                <S.OrderDetailsListFooterWarning>
                  Escolha a mesa primeiro
                </S.OrderDetailsListFooterWarning>
              )}
              <ButtonLarge
                value="Continue para pagamento"
                onClick={onProceedToPayment}
                disabled={disabledButton}
              />
            </S.OrderDetailsListFooter>
          }
        />
      </S.OrderDetailsList>
    </S.OrderDetails>
  );
};

export default OrderDetails;
