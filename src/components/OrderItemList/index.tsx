import * as S from "./styles";
import React, { HTMLAttributes } from "react";

type DivType = HTMLAttributes<HTMLDivElement>;
export type OrderItemListProps = {
  header?: React.ReactNode;//Como se fosse uma representação virtual do DOM.
  footer?: React.ReactNode;
  list: React.ReactNode;
} & DivType;

const OrderItemList = ({
  header,
  list,
  footer,
  ...props
}: OrderItemListProps) => {
  return (
    <div {...props}>
      {header && <S.OrderItemListTitle> {header} </S.OrderItemListTitle>}
      <S.OrderItemList role="listbox"> {list} </S.OrderItemList>{/**Role serve para dar mais semântica aos documentos */}
      {footer && <footer> {footer} </footer>}
    </div>
  );
};

export default OrderItemList;
