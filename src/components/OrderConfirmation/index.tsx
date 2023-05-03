import { HTMLAttributes, useEffect, useState } from "react";
import { OrderItemType } from "../../types/OrderItemType";
import OrderItem from "../OrderItem";
import OrderItemList from "../OrderItemList";
import * as S from "./styles";

type OrdersDetailsType = HTMLAttributes<HTMLDivElement>;

type OrderCheckoutSection = {
  orders: OrderItemType[];
  onOrdersChange: (orders: OrderItemType[]) => void;
  onRemoveItem: (id: string) => void;
} & OrdersDetailsType;

const OrderConfirmation = ({
  orders,
  onRemoveItem,
  onOrdersChange,
}: OrderCheckoutSection) => {
  const price = orders
    .map((item) => item.product.price * item.quantity)
    .reduce((a, b) => a + b, 0);
  const [priceState, setPriceState] = useState(price);

  const handleChange = (data: OrderItemType) => {
    const list = orders.map((item) =>
      item.product.id === data.product.id ? data : item
    );
    onOrdersChange(list);
  };

  useEffect(() => {
    setPriceState(price);
  }, [price, orders]);

  return (
    <S.OrderConfirmation>
      <S.OrderConfirmationHead>Confirmação</S.OrderConfirmationHead>
      <S.OrderConfirmationSub>Detalhes do pedido</S.OrderConfirmationSub>

      <OrderItemList
        list={orders.map((item, index) => (
          <OrderItem
            onRemoveItem={() => onRemoveItem(item.product.id)}
            onItemChange={handleChange}
            product={item.product}
            description={item.description}
            quantity={item.quantity}
            key={`OrderConfirmation-${index}`}
          />
        ))}
        footer={
          <S.OrderConfirmationFooter>
            <S.OrderConfirmationFooterRow>
              <span>Subtotal</span>
              <span>R$ {priceState.toFixed(2)}</span>
            </S.OrderConfirmationFooterRow>
          </S.OrderConfirmationFooter>
        }
      />
    </S.OrderConfirmation>
  );
};

export default OrderConfirmation;
