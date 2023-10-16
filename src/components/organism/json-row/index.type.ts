import { CSSProperties } from "react";
import { JsonTreeFormatV2 } from "../../../models/json-viewer";

export interface JsonRowProps {
  row: JsonTreeFormatV2;
  style: CSSProperties;
}