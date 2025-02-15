"use server";

import DB from "@/db";
import { SignUpState } from "@/types";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email({
    message: "メールアドレスを入力してください。",
  }),
  name: z.string().min(1, { message: "名前を入力してください。" }),
  password: z.string().min(8, {
    message: "8文字以上のパスワードを入力してください。",
  }),
});

export async function signUpAction(
  _: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const validated = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!validated.success) {
    return {
      data: {
        email: (formData.get("email") ?? "") as string,
        name: (formData.get("name") ?? "") as string,
        password: (formData.get("password") ?? "") as string,
      },
      errors: validated.error.flatten().fieldErrors,
    };
  }
  const { email, name, password } = validated.data;

  try {
    const existingUser = await DB.getUserFromEmail(email);
    if (existingUser) {
      return {
        data: validated.data,
        errors: { email: ["このメールアドレスは既に登録されています。"] },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await DB.createUser({
      email,
      name,
      password: hashedPassword,
    });
  } catch {
    return {
      data: validated.data,
      errors: { noField: ["会員登録に失敗しました。"] },
    };
  }

  redirect("/login");
}
