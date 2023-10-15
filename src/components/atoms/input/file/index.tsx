import { FC } from 'react';
import * as S from './index.style';
import { InputFileProps } from './index.type';

export const InputFile:FC<InputFileProps> = ({ onChange, ...rest }) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && onChange) {
      onChange(files[0]);
    }
  }

  return <S.InputFileStyled>
    <S.InputFileCustom type='file' onChange={handleFileChange} {...rest} />
  </S.InputFileStyled>;
};
