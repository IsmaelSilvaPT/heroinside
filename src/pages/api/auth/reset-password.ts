import { NextApiRequest, NextApiResponse } from "next";
import { resetPassword } from "@/lib/userService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Token and password are required",
      });
    }

    await resetPassword(token, password);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({
      message: error instanceof Error ? error.message : "Reset password failed",
    });
  }
} 