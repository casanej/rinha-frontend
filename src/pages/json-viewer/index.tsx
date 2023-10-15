import { useMemo } from 'react';
import * as S from './index.style';
import { JsonViewerPageProps } from './index.type';
import { jsonTreeFormatV2 } from '../../utils/json/json-tree-format';
import { ListVirtualizer } from '../../components';

export default function JsonViewerPage({ file, onBack }: JsonViewerPageProps) {
  const formattedJson = useMemo(() => {
    console.time('loadJson');
    console.time('loadAll');
    const response = jsonTreeFormatV2(file.data);
    console.timeEnd('loadJson');

    return {
      response,
      length: response.length
    };
  }, [file.data]);

  return <S.JsonViewerPageStyled>
    <S.JsonViewerFileName>
      <span onClick={onBack}>➜</span>
      {file.name}
    </S.JsonViewerFileName>
    <div>
      <ListVirtualizer
        items={formattedJson.response}
        itemsQuantity={formattedJson.length}
        containerHeight={window.innerHeight - 65}
        itemHeight={20}
      />
    </div>
  </S.JsonViewerPageStyled>;
};
