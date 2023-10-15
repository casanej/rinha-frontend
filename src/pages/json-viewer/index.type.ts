import { JsonTreeObject } from "../../models/json-viewer";

export interface JsonViewerPageProps {
  file: JsonTreeObject;
  onBack: () => void;
}