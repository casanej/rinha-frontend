import Dexie, { Table } from "dexie";

export const JSON_LIST_DB_NAME = 'JsonListDB';

interface JsonNodeTableRef {
  id?: number;
  rangeStart: number;
  rangeEnd: number;
  nodes: string;
}

export class JsonNodesTable extends Dexie {
  jsonNodes!: Table<JsonNodeTableRef>;

  constructor() {
    super(JSON_LIST_DB_NAME);
    this.version(1).stores({
      jsonNodes: '++id, rangeStart, rangeEnd, nodes'
    });
  }

  addList = async (rangeStart: number, rangeEnd: number, nodes: string) => {
    return this.transaction('rw', this.jsonNodes, () => {
      this.jsonNodes.add({ rangeStart, rangeEnd, nodes });
    });
  }
}

export const indexedDb = new JsonNodesTable();