import { FC } from 'react';
import { JsonRowProps } from './index.type';
import * as S from './index.style';

export const JsonRow: FC<JsonRowProps> = ({ row, style }) => {

  if (row.type === 'endObject' || row.type === 'endArray') return <S.JsonRowContainer type={row.type as S.JsonRowTypeColors} depth={row.depth} style={style} >
    <label></label><label>{row.value}</label>
  </S.JsonRowContainer>;

  return <S.JsonRowContainer type={row.type as S.JsonRowTypeColors} depth={row.depth} style={style} >
    <label>{row.key}:</label> <label>{row.type === 'string' ? `"${row.value}"` : row.value}</label>
  </S.JsonRowContainer>;
};
