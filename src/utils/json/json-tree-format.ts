import { JsonTreeFormatV2 } from "../../models/json-viewer";
import { trampoline } from "../trampoline";

export const jsonTreeFormatV2 = (jsonObject: any, list: JsonTreeFormatV2[] = [], depth = 0): JsonTreeFormatV2[] => {
  Object.keys(jsonObject).forEach(key => {
    const message = jsonObject[key];
    const type = typeof message;

    const isArray = message instanceof Array;

    const currentJson = {
      key,
      depth,
      type,
      value: `${message}`,
    } as JsonTreeFormatV2;

    if (isArray) {

      currentJson.type = 'array';
      currentJson.value = '[';

      list.push(currentJson);
      trampoline(jsonTreeFormatV2)(message, list, depth + 1);
      list.push({
        key: '',
        value: ']',
        depth,
        type: 'endArray',
      });

    } else if (type === 'object' && message !== undefined && message !== null) {
      currentJson.type = 'object';
      currentJson.value = '{';

      list.push(currentJson);
      trampoline(jsonTreeFormatV2)(message, list, depth + 1);
      list.push({
        key: '',
        value: '}',
        depth: depth,
        type: 'endObject'
      });
    } else if (type === 'object' && message === undefined) {
      currentJson.type = 'undefined';
      list.push(currentJson);
    } else {
      list.push(currentJson);
    }

  });

  return list;
};