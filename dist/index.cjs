"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  SupabasePageHandler: () => SupabasePageHandler
});
module.exports = __toCommonJS(src_exports);
var SupabasePageHandler = class {
  constructor(client, tableName = "", columns = "*", limit = 10) {
    this.client = client;
    this.tableName = tableName;
    this.columns = columns;
    this.limit = limit;
  }
  setTableName(tableName) {
    this.tableName = tableName;
  }
  setLimit(limit) {
    this.limit = limit;
  }
  setColumns(columns) {
    this.columns = columns;
  }
  getHandlerProps() {
    return {
      tableName: this.tableName,
      columns: this.columns,
      limit: this.limit
    };
  }
  async getDataAll() {
    const data = await this.client.from(this.tableName).select(this.columns);
    return data;
  }
  async getPage(page) {
    const to = (page - 1) * this.limit;
    const from = page * this.limit;
    const { data } = await this.client.from(this.tableName).select(this.columns).range(to, from);
    if (!data || data?.length < 1) return { data: null, nextPage: null };
    if (data.length > this.limit) {
      const response = data.slice(0, this.limit);
      const nextPage = page + 1;
      return { data: response, nextPage };
    } else {
      const nextPage = null;
      return { data, nextPage };
    }
  }
};
//# sourceMappingURL=index.cjs.map
