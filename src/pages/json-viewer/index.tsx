import { useMemo } from 'react';
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from 'react-window';
import * as S from './index.style';
import { JsonViewerPageProps } from './index.type';
import { jsonTreeFormatV2 } from '../../utils/json/json-tree-format';
import { JsonRow } from '../../components';

export default function JsonViewerPage({ file, onBack }: JsonViewerPageProps) {
  const formattedJson = useMemo(() => {
    console.time('loadJson');
    const response = jsonTreeFormatV2(file.data);
    console.timeEnd('loadJson');

    return {
      response,
      length: response.length
    };
  }, [file.data]);

  const Row = ({ index, style }: any) => (
    <JsonRow style={style} row={formattedJson.response[index]} />
  );

  return <S.JsonViewerPageStyled>
    <S.JsonViewerFileName>
      <span onClick={onBack}>➜</span>
      {file.name}
    </S.JsonViewerFileName>
    <S.JsonViewerTree>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={formattedJson.length}
            itemSize={30}
            width={width}
            style={{
              overflowX: 'hidden',
              overflowY: 'auto'
            }}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </S.JsonViewerTree>
  </S.JsonViewerPageStyled>;
};
