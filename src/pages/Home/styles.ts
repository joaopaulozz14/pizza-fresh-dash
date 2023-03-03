import styled, { css } from "styled-components";

export const Home = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.baseBg1};
    min-width: 100vw;
    min-height: 100vh;
    color: ${theme.colors.textColor};
    display: flex;
    justify-content: space-between;
  `}
`;

export const HomeContent = styled.main`
  ${() => css`
    width: calc(100% - 450px);
    padding: 20px;
    overflow: auto;
    height: 100vh;
    box-sizing: border-box;
    //border: 1px solid white;
    //background-color: red;
  `}
`;

export const HomeHeaderDetails = styled.div`
  ${() => css`
    display: flex;
    justify-content: space-between;
  `}
`;

export const HomeHeaderDetailsLogo = styled.h1`
  ${({ theme }) => css`
    ${theme.mixins.logoStyle};
    text-transform: uppercase;
    margin: 0;
  `}
`;

export const HomeHeaderDetailsDate = styled.p`
  ${({ theme }) => css`
    ${theme.mixins.bodyStyle()};
    text-transform: capitalize;
  `}
`;

export const HomeHeaderDetailsSearch = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    ${theme.mixins.input()};
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
    input {
      background: transparent;
      height: 100%;
      color: ${theme.colors.textColor};
      border: none;
    }
  `}
`;

export const HomeProductTitle = styled.h2`
  ${({ theme }) => css`
    margin: 0;
    border-bottom: 1px solid ${theme.colors.baseLine};
    ${theme.mixins.bodyStyle()};
    color: ${theme.colors.primaryColor};
    padding-bottom: 10px;
    //border: 1px solid red;
    b {
      position: relative;
      //::after and ::before allows insert content onto a page without it needing to be in the HTML; It is usually used in the property.
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -13px;
        width: 100%;
        height: 4px;
        background-color: ${theme.colors.primaryColor};
        border-radius: 5rem;
      }
    }
  `}
`;

export const HomeProductList = styled.div`
  ${() => css`
    margin-top: 25px;
    padding-bottom: 25px;
  `}
`;

export const HomeProductListGap = styled.div`
  ${({ theme }) => css`
    width: 200px;
  `}
`;
