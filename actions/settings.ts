"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

export async function updatePasswordAction(
  formData: FormData
): Promise<UpdatePasswordResponse> {
  try {
    const adminUser = await requireAdmin();

    const newPassword = (formData.get("newPassword") as string) || "";
    const confirmPassword = (formData.get("confirmPassword") as string) || "";

    if (!newPassword || !confirmPassword) {
      return { success: false, message: "Please fill in all password fields." };
    }

    if (newPassword.length < 6) {
      return {
        success: false,
        message: "New password must be at least 6 characters long.",
      };
    }

    if (newPassword !== confirmPassword) {
      return {
        success: false,
        message: "New password and confirmation do not match.",
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: adminUser.id },
    });

    if (!user) {
      return { success: false, message: "User account not found." };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: adminUser.id },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      message: "Password updated successfully!",
    };
  } catch (error: any) {
    console.error("updatePasswordAction error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
}
