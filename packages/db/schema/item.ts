import { sql } from "drizzle-orm";
import { serial, timestamp, varchar, int } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const item = mySqlTable("post", {
  id: serial("id").primaryKey(),
  item_name: varchar("item_name", { length: 256 }).notNull(),
  number: int("number").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});
