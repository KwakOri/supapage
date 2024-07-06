import { SupabaseClient } from "@supabase/supabase-js";
export declare class SupabasePageHandler<Database> {
    private client;
    private tableName;
    private columns;
    private limit;
    constructor(client: SupabaseClient<Database>, tableName?: string, columns?: string, limit?: number);
    setTableName(tableName: string): void;
    setLimit(limit: number): void;
    setColumns(columns: string): void;
    getHandlerProps(): {
        tableName: string;
        columns: string;
        limit: number;
    };
    getDataAll(): Promise<import("@supabase/supabase-js").PostgrestSingleResponse<({
        error: true;
    } & "Received a generic string")[]>>;
    getPage(page: number): Promise<{
        data: any;
        nextPage: number | null;
    }>;
}
