/**
 * lib/prisma.ts — Prisma Client singleton with pg driver adapter (Prisma 7+)
 *
 * Prisma 7 requires a driver adapter to be passed to PrismaClient.
 * We use @prisma/adapter-pg with a connection pool.
 * The singleton pattern prevents creating too many connections during Next.js hot reload.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL!;
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

function getClient(): PrismaClient {
  if (
    !globalForPrisma.prisma ||
    !("blogPost" in globalForPrisma.prisma)
  ) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
