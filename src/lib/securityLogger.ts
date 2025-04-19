import { PrismaClient } from "@prisma/client";
import { sendSecurityAlertEmail } from "./emailService";

const prisma = new PrismaClient();

export type SecurityEventType =
  | "login"
  | "login_failed"
  | "password_reset"
  | "email_verification"
  | "profile_update"
  | "suspicious_activity";

export async function logSecurityEvent(
  userId: string,
  eventType: SecurityEventType,
  details: string,
  ipAddress?: string
) {
  const event = await prisma.securityLog.create({
    data: {
      userId,
      eventType,
      details,
      ipAddress,
    },
  });

  // Envoyer une alerte pour les événements critiques
  if (["login_failed", "suspicious_activity"].includes(eventType)) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      await sendSecurityAlertEmail(
        user.email,
        `Événement de sécurité : ${eventType} - ${details}`
      );
    }
  }

  return event;
}

export async function getSecurityLogs(userId: string) {
  return prisma.securityLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function checkSuspiciousActivity(userId: string) {
  const recentFailedLogins = await prisma.securityLog.count({
    where: {
      userId,
      eventType: "login_failed",
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 heures
      },
    },
  });

  if (recentFailedLogins >= 5) {
    await logSecurityEvent(
      userId,
      "suspicious_activity",
      "Trop de tentatives de connexion échouées"
    );
    return true;
  }

  return false;
} 