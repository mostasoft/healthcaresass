// lib/prisma.js
import { PrismaClient } from "@prisma/client";

let prisma;

if (!globalThis.prisma) {
  globalThis.prisma = new PrismaClient({
    log: ["query"], // optional: helps debug
  });
}

prisma = globalThis.prisma;

export default prisma;
