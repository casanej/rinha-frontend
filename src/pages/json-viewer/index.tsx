import { useMemo } from 'react';
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList as List } from 'react-window';
import * as S from './index.style';
import { JsonViewerPageProps } from './index.type';
import { jsonTreeFormatV2 } from '../../utils/json/json-tree-format';
import { JsonRow } from '../../components';

const MAX_CHARS_PER_LINE_DEFAULT = 265;
const MAX_WINDOW_SIZE = 1900;
const MIN_WINDOW_SIZE = 360;
const LINE_HEIGHT = 20;

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

  const handleItemSize = (windowWidth: number) => {
    return (index: number) => {
      const percentageMultiply = MAX_WINDOW_SIZE / Math.max(windowWidth, MIN_WINDOW_SIZE);
      const maxCharsPerLine = MAX_CHARS_PER_LINE_DEFAULT / percentageMultiply;

      if (formattedJson.response[index].chars >= maxCharsPerLine) {
        return ((((formattedJson.response[index].chars / maxCharsPerLine)) * LINE_HEIGHT)) + 5;
      }

      return 20;
    }
  }

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
            itemSize={handleItemSize(width)}
            width={width}
            style={{
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </S.JsonViewerTree>
  </S.JsonViewerPageStyled>;
};
