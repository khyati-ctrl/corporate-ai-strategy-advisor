import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });

const globalForPrismaNative2 = global as unknown as { prismaNative2: PrismaClient };

export const prisma =
  globalForPrismaNative2.prismaNative2 ||
  new PrismaClient({
    adapter,
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrismaNative2.prismaNative2 = prisma;
