import { JsonTreeFormatV2 } from "../../models/json-viewer";
import { trampoline } from "../trampoline";

export const jsonTreeFormatV2 = (jsonObject: any, list: JsonTreeFormatV2[] = [], depth = 0): JsonTreeFormatV2[] => {
  Object.keys(jsonObject).forEach(key => {
    const message = jsonObject[key];
    const type = typeof message;

    const currentJson = {
      key,
      depth,
      type,
      value: `${message}`,
    } as JsonTreeFormatV2;

    if (type === 'object' && message === undefined) {
      currentJson.type = 'undefined';
      list.push(currentJson);
    } else if (
      (type === 'object' && message === null)
      || type === 'string'
      || type === 'number'
      || type === 'boolean'
    ) {
      list.push(currentJson);
    } else {
      const isArray = Array.isArray(message);
      currentJson.type = isArray ? 'array' : 'object';
      currentJson.value = isArray ? '[' : '{';

      list.push(currentJson);
      trampoline(jsonTreeFormatV2)(message, list, depth + 1) as any;
      list.push({
        key: '',
        value: isArray ? ']' : '}',
        depth: depth,
        type: isArray ? 'endArray' : 'endObject'
      });
    }

  });

  return list;
};