import { randomUUID } from "node:crypto";
import { Pool } from "pg";

import { NotionAuthState, User } from "./types";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default class DB {
  static async getUserFromId(id: string) {
    const result = await pool.query<User>(
      'SELECT "id", "email", "name", "notion_token", "NotionAuthState" FROM "User" WHERE "id" = $1',
      [id]
    );
    return result.rows.at(0);
  }

  static async getUserFromEmail(email: string) {
    const result = await pool.query<User>(
      'SELECT "id", "email", "name", "notion_token", "NotionAuthState" FROM "User" WHERE "email" = $1',
      [email]
    );
    return result.rows.at(0);
  }

  static async createUser(
    user: Omit<User, "id" | "notion_token" | "NotionAuthState"> & {
      password: string;
    }
  ) {
    await pool.query(
      'INSERT INTO "User" ("id", "email", "name", "password") VALUES ($1, $2, $3, $4)',
      [randomUUID(), user.email, user.name, user.password]
    );
  }

  static async setNotionToken(
    userId: string,
    notionToken: string,
    state: string
  ) {
    const client = await pool.connect();
    try {
      await client.query(
        'UPDATE "User" SET "notion_token" = $1 WHERE "id" = $2',
        [notionToken, userId]
      );
      await client.query('DELETE FROM "NotionAuthState" WHERE "state" = $1', [
        state,
      ]);
    } finally {
      client.release();
    }
  }

  static async getNotionAuthState(state: string, createdAtGt: Date) {
    const result = await pool.query<NotionAuthState>(
      'SELECT * FROM "NotionAuthState" WHERE "state" = $1 AND "created_at" > $2',
      [state, createdAtGt]
    );
    return result.rows.at(0);
  }

  static async deleteAndCreateNotionAuthState(userId: string, state: string) {
    const client = await pool.connect();
    try {
      await client.query('DELETE FROM "NotionAuthState" WHERE "user_id" = $1', [
        userId,
      ]);
      await client.query(
        'INSERT INTO "NotionAuthState" ("id", "user_id", "state") VALUES ($1, $2, $3)',
        [randomUUID(), userId, state]
      );
    } finally {
      client.release();
    }
  }
}
