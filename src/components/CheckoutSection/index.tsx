import * as S from "./styles";
import OrderConfirmation from "../OrderConfirmation";
import CheckboxIcon from "../CheckboxIcon";
import { CreditCard, Wallet } from "../../assets/icons";
import { HTMLAttributes, useState } from "react";
import { OrderItemType } from "../../types/OrderItemType";
import { OrderType } from "../../types/OrderType";
import { PaymentMethod } from "../../types/PaymentMethod";
import { useMutation } from "@tanstack/react-query";
import { OrderService } from "../../services/OrderService";
import { ErrorResponse } from "../../types/api/error";
import { LocalStorageHelper } from "../../helpers/LocalStorageHelper";
import { LocalStorageKeys } from "../../types/LocalStorageKeys";
import { UserResponse } from "../../types/api/user";
import { Order } from "../../types/api/order";

type CheckoutSectionType = HTMLAttributes<HTMLDivElement>;

type OrderCheckoutSection = {
  orders: OrderItemType[];
  onOrdersChange: (orders: OrderItemType[]) => void;
  onRemoveItem: (id: string) => void;
  onCloseSection: () => void;
  selectedTable?: number;
  activeOrderType: OrderType;
  onChangeActiveOrderType: (data: OrderType) => void;
} & CheckoutSectionType;

const CheckoutSection = ({
  orders,
  onOrdersChange,
  onCloseSection,
  onRemoveItem,
  selectedTable,
  activeOrderType,
  onChangeActiveOrderType,
}: OrderCheckoutSection) => {
  const [closing, setClosing] = useState<boolean>(false);
  const [activeMethod, setActiveMethod] = useState<PaymentMethod>();

  const closeOrder = useMutation(OrderService.create, {
    onSuccess: (data: {} & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }
      onOrdersChange([]);
    },
    onError: () => {
      console.log("Erro ao fechar o pedido");
    },
  });

  const handlePaymentConfirm = () => {
    const userId =
      LocalStorageHelper.get<UserResponse>(LocalStorageKeys.USER)?.id || "";
    const orderRequest: Order = {
      userId,
      tableNumber: Number(selectedTable),
      products: orders,
    };
    //console.log(orderRequest);
    closeOrder.mutate(orderRequest);
  };

  const handleCloseSection = () => {
    setClosing(true);
    setTimeout(onCloseSection, 800);
  };
  return (
    <S.CheckoutSection closing={closing}>
      <S.CheckoutSectionConfirmation>
        <span onClick={handleCloseSection} className="close-section">
          <S.BackIcon />
        </span>
        <OrderConfirmation
          orders={orders}
          onOrdersChange={onOrdersChange}
          onRemoveItem={onRemoveItem}
        />
      </S.CheckoutSectionConfirmation>
      <S.CheckoutSectionPayment>
        <S.CheckoutSectionPaymentHead>Pagamento</S.CheckoutSectionPaymentHead>
        <S.CheckoutSectionPaymentSub>
          2 métodos de pagamento disponíveis
        </S.CheckoutSectionPaymentSub>
        <S.CheckoutSectionPaymentForm>
          <S.CheckoutSectionPaymentFormTitle>
            Método de Pagamento
          </S.CheckoutSectionPaymentFormTitle>
          <S.PaymentForm>
            <S.PaymentFormCheckbox>
              <CheckboxIcon
                onClick={() => setActiveMethod(PaymentMethod.CARD)}
                active={activeMethod === PaymentMethod.CARD}
                icon={CreditCard()}
                value="cartão"
              />
              <CheckboxIcon
                onClick={() => setActiveMethod(PaymentMethod.CASH)}
                active={activeMethod === PaymentMethod.CASH}
                icon={Wallet()}
                value="Dinheiro"
              />
            </S.PaymentFormCheckbox>
            <>
              <S.PaymentFormGroup>
                <label htmlFor="titular">Titular do cartão</label>
                <input
                  type="text"
                  name="titular"
                  id="titular"
                  placeholder="Marcus Silva"
                />
              </S.PaymentFormGroup>

              <S.PaymentFormGroup>
                <label htmlFor="card">Número do cartão</label>
                <input
                  type="text"
                  name="card"
                  id="card"
                  placeholder="5369 7644 5393 3165"
                />
              </S.PaymentFormGroup>

              <S.PaymentFormHalf>
                <S.PaymentFormHalfItem>
                  <label htmlFor="validity">Validade</label>
                  <input
                    type="text"
                    name="card"
                    id="validity"
                    placeholder="09/2023"
                  />
                </S.PaymentFormHalfItem>
                <S.PaymentFormHalfItem>
                  <label htmlFor="cvv">CVV</label>
                  <input type="text" name="cvv" id="cvv" placeholder="218" />
                </S.PaymentFormHalfItem>
              </S.PaymentFormHalf>
            </>
          </S.PaymentForm>
        </S.CheckoutSectionPaymentForm>
        <S.PaymentActions>
          <S.PaymentActionsDetails>
            <S.PaymentActionsDetailsOrderType>
              <label htmlFor="card">Tipo de pedido</label>
              <select
                onChange={({ target }) =>
                  onChangeActiveOrderType(target.value as OrderType)
                }
                value={Object.values(OrderType)
                  .filter((option) => option === activeOrderType)
                  .pop()}
                id="order-type"
                name="order-type"
              >
                {Object.values(OrderType).map((value, idx) => (
                  <option key={`OrderType-${idx}`} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </S.PaymentActionsDetailsOrderType>
            <S.PaymentActionsDetailsTableNumber>
              <label htmlFor="card">Número da mesa</label>
              <input
                type="text"
                name="table"
                id="table"
                placeholder="01"
                disabled
                value={selectedTable}
              />
            </S.PaymentActionsDetailsTableNumber>
          </S.PaymentActionsDetails>

          <S.PaymentActionsButtonGroup>
            <S.PaymentActionsButtonGroupCancel onClick={handleCloseSection}>
              Cancelar
            </S.PaymentActionsButtonGroupCancel>
            <S.PaymentActionsButtonGroupConfirm onClick={handlePaymentConfirm}>
              Confirmar Pagamento
            </S.PaymentActionsButtonGroupConfirm>
          </S.PaymentActionsButtonGroup>
        </S.PaymentActions>
      </S.CheckoutSectionPayment>
    </S.CheckoutSection>
  );
};

export default CheckoutSection;
