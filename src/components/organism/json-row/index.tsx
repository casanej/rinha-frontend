import { FC } from 'react';
import { JsonRowProps } from './index.type';
import * as S from './index.style';

export const JsonRow: FC<JsonRowProps> = ({ row }) => {

  if (row.type === 'endObject' || row.type === 'endArray') return <S.JsonRowContainer type={row.type as S.JsonRowTypeColors} depth={row.depth} >
    <span></span><span>{row.value}</span>
  </S.JsonRowContainer>;

  return <S.JsonRowContainer type={row.type as S.JsonRowTypeColors} depth={row.depth} >
    <span>{row.key}:</span> <span>{row.type === 'string' ? `"${row.value}"` : row.value}</span>
  </S.JsonRowContainer>;
};
