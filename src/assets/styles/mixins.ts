import { css } from "styled-components";
import { colors } from "../styles/colors";
import { constants } from "../styles/constants";
import { Down } from "../icons/index";

const logoStyle = () => css`
  font-family: ${constants.logoFontFamily};
  font-size: ${constants.logoFontSize};
  line-height: ${constants.logoLineHeight};
`;

const headingStyle = () => css`
  font-family: ${constants.headingFontFamily};
  font-size: ${constants.headingFontSize};
  line-height: ${constants.headingLineHeight};
`;

const bodyStyle = () => css`
  font-family: ${constants.bodyFontFamily};
  font-size: ${constants.bodyFontSize};
  line-height: ${constants.bodyLineHeight};
`;

const overlay = () => css`
  background: rgb(0, 0, 0, 0.6);
`;

const buttonOutlineModifiers = {
  square: () => css`
    width: 48px;
  `,
};

const buttonOutline = (color = colors.primaryColor, square = false) => css`
  height: 48px;
  background: transparent;
  border-radius: 8px;
  padding: 14px;
  cursor: pointer;
  border: 1px solid ${color};
  color: ${color};
  ${square && buttonOutlineModifiers.square()}
`;

const buttonFilled = (color = colors.primaryColor) => css`
  background: ${color};
  border: none;
  border-radius: 8px;
  color: ${colors.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  cursor: pointer;
  ${bodyStyle()};
  font-weight: 600;
  box-shadow: 0px 8px 24px 0px ${colors.shadowColor};
`;

const buttonIconModifiers = {
  active: () => css`
    box-shadow: 0px 8px 24px 0px ${colors.shadowColor};
  `,
};

const buttonIcon = (active = false) => css`
  height: 56px;
  width: 56px;
  border-radius: 8px;
  padding: 16px;
  border: none;
  cursor: pointer;
  background-color: ${active ? colors.primaryColor : "transparent"};
  color: ${active ? colors.textColor : colors.primaryColor};
  ${active && buttonIconModifiers.active()}
`;

const buttonToggle = (active = false) => css`
  border-radius: 8px;
  padding: 7px 12px;
  border: ${active ? "none" : "1px solid " + colors.baseLine};
  height: 35px;
  cursor: pointer;
  background-color: ${active ? colors.primaryColor : "transparent"};
  color: ${active ? colors.textColor : colors.primaryColor};
`;

const input = () => css`
  height: 48px;
  border-radius: 8px;
  padding: 14px;
  background: ${colors.baseForm};
  border: 1px solid ${colors.baseLine};
  box-sizing: border-box;
`;

const select = (important = true) => css`
  ${input()};
  ${bodyStyle()};
  appearance: none;
  background: ${important ? colors.secondaryColor : "transparent"};
  border: ${important ? "none" : "1px solid " + colors.baseLine};
  color: ${colors.textColor};
  background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' fill='none' viewBox='0 0 12 7' %3E%3Cpath fill='%23fff' fillRule='evenodd' d='M6 6.333a.828.828 0 01-.534-.193l-5-4.167A.833.833 0 111.533.693l4.476 3.73L10.477.827a.834.834 0 011.045 1.299l-5 4.023A.833.833 0 016 6.333' clipRule='evenodd' %3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  padding-right: 50px;
  background-position: 85%;
`;
  
export const mixins = {
  bodyStyle,
  buttonFilled,
  buttonIcon,
  buttonOutline,
  buttonToggle,
  headingStyle,
  input,
  logoStyle,
  overlay,
  select,
};
