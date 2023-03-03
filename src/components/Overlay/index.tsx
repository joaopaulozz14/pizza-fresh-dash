import * as S from "./styles";
import React from "react";

export type OverlayProps = {
  children: React.ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return <S.Overlay>{children}</S.Overlay>;
};

export default Overlay;
