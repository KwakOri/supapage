// src/index.ts
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
export {
  SupabasePageHandler
};
//# sourceMappingURL=index.js.map
