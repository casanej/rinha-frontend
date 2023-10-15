import { useState, FC, useEffect, ReactNode, useMemo } from "react";
import { JsonRow } from "..";
import { JsonTreeFormatV2 } from "../../../models/json-viewer";
import * as S from './index.style';
import { ListVirtualizerProps } from "./index.type";

const MAX_ITENS_TO_LOAD = 50000;

interface ListPages {
  page: number;
  startRange: number;
  endRange: number;
  nodes: JsonTreeFormatV2[];
}

export const ListVirtualizer: FC<ListVirtualizerProps> = ({ items, itemsQuantity, itemHeight, containerHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const pages = useMemo((): ListPages[] => {
    let list: ListPages[] = [];

    console.time('loadPages');

    while (items.length > 0) {
      const page = list.length;
      const startRange = page * MAX_ITENS_TO_LOAD;
      const endRange = (page + 1) * MAX_ITENS_TO_LOAD;
      const nodes = items.splice(0, MAX_ITENS_TO_LOAD);

      const plus500NodesCopy: JsonTreeFormatV2[] = [];

      if (nodes.length > MAX_ITENS_TO_LOAD) {
        plus500NodesCopy.concat(items.slice(0, 500));
      }

      const totalNodes = nodes.concat(plus500NodesCopy);

      list.push({ page, startRange, endRange, nodes: totalNodes });
    }

    console.timeEnd('loadPages');

    return list;
  }, []);

  const renderizeVisibleList = useMemo(() => {
    let list: ReactNode[] = [];

    const startPage = Math.max(0, currentPage - 1);
    const endPage = Math.min(pages.length, currentPage + 1);


    if (startPage >= 1) {
      let totalBefore = 0;

      for (let i = startPage - 1; i >= 0; i--) {
        totalBefore += pages[i].nodes.length;
      }

      list = new Array(totalBefore).fill(null)
    }

    for (let i = startPage; i < endPage; i++) {
      for (const item of pages[i].nodes) {
        list.push(<JsonRow key={item.key + item.depth + item.type} row={item} />)
      }
    }

    console.timeEnd('loadAll');

    return list;
  }, [pages, currentPage])

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    itemsQuantity
  );
  const visibleItems = renderizeVisibleList.slice(startIndex, endIndex);
  const invisibleItemsHeight = (startIndex + visibleItems.length - endIndex) * itemHeight;

  useEffect(() => {
    const listCurrentPage = pages.findIndex(page => page.startRange <= startIndex && page.endRange >= startIndex)!;

    if (listCurrentPage !== currentPage) {
      setCurrentPage(listCurrentPage);
    }
  }, [endIndex]);


  const handleScroll = (event: any) => {
    setScrollTop(event.target.scrollTop);
  };

  return (
    <div
      style={{ height: `${containerHeight}px`, overflowY: "auto" }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${itemsQuantity * itemHeight}px` }}>
        <div
          style={{
            position: "relative",
            height: `${visibleItems.length * itemHeight}px`,
            top: `${startIndex * itemHeight}px`,
          }}
        >
          {visibleItems.map((item, index) => (
            <S.LisVirtualizedRow key={index} style={{ height: `${itemHeight}px` }}>
              {item}
            </S.LisVirtualizedRow>
          ))}
        </div>
        <div style={{ height: `${invisibleItemsHeight}px` }} />
      </div>
    </div>
  );
}