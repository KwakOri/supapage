import { SupabaseClient } from "@supabase/supabase-js";

export class SupabasePageHandler<Database> {
  private client: SupabaseClient<Database>;
  private tableName: string;
  private columns: string;
  private limit: number;
  constructor(
    client: SupabaseClient<Database>,
    tableName: string = "",
    columns: string = "*",
    limit: number = 10
  ) {
    this.client = client;
    this.tableName = tableName;
    this.columns = columns;
    this.limit = limit;
  }

  setTableName(tableName: string) {
    this.tableName = tableName;
  }

  setLimit(limit: number) {
    this.limit = limit;
  }

  setColumns(columns: string) {
    this.columns = columns;
  }

  getHandlerProps() {
    return {
      tableName: this.tableName,
      columns: this.columns,
      limit: this.limit,
    };
  }

  async getDataAll() {
    const data = await this.client.from(this.tableName).select(this.columns);
    return data;
  }

  async getPage(page: number): Promise<{ data: any; nextPage: number | null }> {
    const to = (page - 1) * this.limit;
    const from = page * this.limit;
    const { data } = await this.client
      .from(this.tableName)
      .select(this.columns)
      .range(to, from);

    if (!data || data?.length < 1) return { data: null, nextPage: null };

    if (data.length > this.limit) {
      // 다음 페이지가 있다는 뜻.
      const response = data.slice(0, this.limit);
      const nextPage = page + 1;
      return { data: response, nextPage };
    } else {
      // 다음 페이지가 없다는 뜻.
      const nextPage = null;
      return { data, nextPage };
    }
  }
}
