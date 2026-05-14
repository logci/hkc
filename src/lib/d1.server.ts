declare global {
  interface D1Result<T = unknown> {
    results?: T[];
    success: boolean;
    meta: Record<string, unknown>;
    error?: string;
  }

  interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    first<T = unknown>(): Promise<T | null>;
    run<T = unknown>(): Promise<D1Result<T>>;
  }

  interface D1Database {
    prepare(query: string): D1PreparedStatement;
  }
}

export type AppRow = {
  id: string;
  password: string;
  repo_url: string;
  heroku_app_name: string;
  heroku_app_url: string | null;
  config_vars: string;
  created_at: string;
};

type GlobalWithD1 = typeof globalThis & { __D1_DB__?: D1Database };

export function getDB(): D1Database {
  const db = (globalThis as GlobalWithD1).__D1_DB__;
  if (!db) throw new Error("D1 database not initialized");
  return db;
}

export function setDB(db: D1Database) {
  (globalThis as GlobalWithD1).__D1_DB__ = db;
}
