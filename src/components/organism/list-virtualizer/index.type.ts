import { JsonTreeFormatV2 } from "../../../models/json-viewer";

export interface ListVirtualizerProps {
  items: JsonTreeFormatV2[]
  itemsQuantity: number;
  itemHeight: number;
  containerHeight: number;
}