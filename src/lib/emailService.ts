import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"HeroInside" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Vérification de votre email",
    html: `
      <h1>Bienvenue sur HeroInside !</h1>
      <p>Cliquez sur le lien suivant pour vérifier votre email :</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>Ce lien expirera dans 24 heures.</p>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"HeroInside" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: `
      <h1>Réinitialisation de mot de passe</h1>
      <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Ce lien expirera dans 1 heure.</p>
      <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
    `,
  });
}

export async function sendSecurityAlertEmail(email: string, action: string) {
  await transporter.sendMail({
    from: `"HeroInside" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Alerte de sécurité",
    html: `
      <h1>Alerte de sécurité</h1>
      <p>Une action sensible a été détectée sur votre compte :</p>
      <p><strong>${action}</strong></p>
      <p>Si vous n'êtes pas à l'origine de cette action, veuillez nous contacter immédiatement.</p>
    `,
  });
} 