import { randomUUID } from "node:crypto";
import { Pool } from "pg";

import { NotionAuthState, User } from "./types";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default class DB {
  static async getUserFromEmail(email: string): Promise<User | undefined> {
    const result = await pool.query(
      `
        SELECT
            "User"."id" user_id,
            "User"."email" user_email,
            "User"."name" user_name,
            "User"."notion_token" user_notion_token,
            "NotionAuthState"."id" notion_auth_state_id,
            "NotionAuthState"."state" notion_auth_state_state,
            "NotionAuthState"."created_at" notion_auth_state_created_at
        FROM "User"
        LEFT OUTER JOIN "NotionAuthState" ON "User"."id" = "NotionAuthState"."user_id"
        WHERE "User"."email" = $1
        `,
      [email]
    );
    const record = result.rows.at(0);
    if (!record) {
      return undefined;
    }

    return {
      id: record.user_id,
      email: record.user_email,
      name: record.user_name,
      notion_token: record.user_notion_token,
      NotionAuthState: record.notion_auth_state_id
        ? {
            id: record.notion_auth_state_id as string,
            user_id: record.user_id as string,
            state: record.notion_auth_state_state as string,
            created_at: record.notion_auth_state_created_at as Date,
          }
        : undefined,
    };
  }

  static async getUserFromEmailWithPassword(
    email: string
  ): Promise<(User & { password: string }) | undefined> {
    const result = await pool.query(
      `
        SELECT
            "User"."id" user_id,
            "User"."email" user_email,
            "User"."name" user_name,
            "User"."password" user_password,
            "User"."notion_token" user_notion_token,
            "NotionAuthState"."id" notion_auth_state_id,
            "NotionAuthState"."state" notion_auth_state_state,
            "NotionAuthState"."created_at" notion_auth_state_created_at
        FROM "User"
        LEFT OUTER JOIN "NotionAuthState" ON "User"."id" = "NotionAuthState"."user_id"
        WHERE "User"."email" = $1
        `,
      [email]
    );
    const record = result.rows.at(0);
    if (!record) {
      return undefined;
    }

    return {
      id: record.user_id,
      email: record.user_email,
      name: record.user_name,
      password: record.user_password,
      notion_token: record.user_notion_token,
      NotionAuthState: record.notion_auth_state_id
        ? {
            id: record.notion_auth_state_id as string,
            user_id: record.user_id as string,
            state: record.notion_auth_state_state as string,
            created_at: record.notion_auth_state_created_at as Date,
          }
        : undefined,
    };
  }

  static async createUser(
    user: Omit<User, "id" | "notion_token" | "NotionAuthState"> & {
      password: string;
    }
  ) {
    await pool.query(
      `
      INSERT INTO "User" ("id", "email", "name", "password")
      VALUES ($1, $2, $3, $4)
    `,
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
        `
        UPDATE "User"
        SET "notion_token" = $1
        WHERE "id" = $2
      `,
        [notionToken, userId]
      );
      await client.query(
        `
        DELETE FROM "NotionAuthState"
        WHERE "state" = $1
      `,
        [state]
      );
    } finally {
      client.release();
    }
  }

  static async getNotionAuthState(state: string, createdAtGt: Date) {
    const result = await pool.query<NotionAuthState>(
      `
      SELECT *
      FROM "NotionAuthState"
      WHERE "state" = $1 AND "created_at" > $2
    `,
      [state, createdAtGt]
    );
    return result.rows.at(0);
  }

  static async deleteAndCreateNotionAuthState(userId: string, state: string) {
    const client = await pool.connect();
    try {
      await client.query(
        `
        DELETE FROM "NotionAuthState"
        WHERE "user_id" = $1
      `,
        [userId]
      );
      await client.query(
        `
        INSERT INTO "NotionAuthState" ("id", "user_id", "state")
        VALUES ($1, $2, $3)
      `,
        [randomUUID(), userId, state]
      );
    } finally {
      client.release();
    }
  }
}
