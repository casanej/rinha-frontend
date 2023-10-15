import React, { FC } from 'react';
import * as S from './index.style';
import { ButtonProps } from './index.type';

export const Button:FC<ButtonProps> = ({ children, onClick }) => {

  return <S.ButtonStyled type='button' onClick={onClick}>{children}</S.ButtonStyled>;
};
