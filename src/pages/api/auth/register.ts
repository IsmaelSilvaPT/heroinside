import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "7d";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password, nom } = req.body;

    if (!email || !password || !nom) {
      return res
        .status(400)
        .json({ message: "Email, password and name are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // TODO: Vérifier si l'email existe déjà en base de données

    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Sauvegarder l'utilisateur en base de données
    const userId = "user-id"; // TODO: Remplacer par l'ID généré

    const token = jwt.sign(
      {
        sub: userId,
        email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
} 