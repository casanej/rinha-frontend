import { JsonTreeFormatV2 } from "../../models/json-viewer";
import { trampoline } from "../trampoline";

export const jsonTreeFormatV2 = (jsonObject: any, list: JsonTreeFormatV2[] = [], depth = 0): JsonTreeFormatV2[] => {
  Object.keys(jsonObject).forEach(key => {
    const message = jsonObject[key];
    const type = typeof message;

    const isArray = message instanceof Array;

    const messageString = `${message}`;

    const currentJson = {
      key,
      depth,
      type,
      value: messageString,
      chars: messageString.length + key.length + (10 * depth) + 2,
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
        chars: 1
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
        type: 'endObject',
        chars: 1
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