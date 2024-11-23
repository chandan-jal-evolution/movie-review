import { PrismaClient } from "@prisma/client";

// Extend the globalThis interface
declare global {
  // Extending the global object for the Node.js environment
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __prisma?: PrismaClient;
    }
  }

  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined; // For usage with globalThis
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient();
  }
  prisma = global.__prisma;
}

export { prisma };
