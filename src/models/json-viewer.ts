export interface JsonTreeObject {
  name: string;
  data: JsonTreeFormatV2[];
}

export interface JsonTreeFormatV2 {
  key: string;
  value?: any;
  depth: number;
  type: string;
  chars: number;
}