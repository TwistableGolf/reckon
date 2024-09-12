import { PrismaClient } from "@prisma/client";

const createPrismaClient = () =>{
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = () => {
  if(globalForPrisma.prisma == null)
  {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma ??= createPrismaClient()
}