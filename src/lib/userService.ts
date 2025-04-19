import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function createUser(email: string, password: string, nom: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await prisma.user.create({
    data: {
      email,
      nom,
      password: hashedPassword,
      verificationToken,
      stats: {
        create: {
          badges: [],
        },
      },
    },
  });

  // TODO: Envoyer l'email de vérification
  return user;
}

export async function verifyUser(token: string) {
  const user = await prisma.user.update({
    where: { verificationToken: token },
    data: {
      emailVerified: true,
      verificationToken: null,
    },
  });

  return user;
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure

  await prisma.user.update({
    where: { email },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });

  // TODO: Envoyer l'email de réinitialisation
  return resetToken;
}

export async function resetPassword(token: string, newPassword: string) {
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error("Token invalide ou expiré");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
}

export async function updateUserStats(userId: string, data: Partial<Prisma.UserStatsUpdateInput>) {
  return prisma.userStats.update({
    where: { userId },
    data,
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: { stats: true },
  });
}

export async function verifyPassword(user: { password: string }, password: string) {
  return bcrypt.compare(password, user.password);
} 