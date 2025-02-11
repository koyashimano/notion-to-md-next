"use client";

import { SignInState } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useActionState, useEffect } from "react";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({ message: "メールアドレスを入力してください。" }),
  password: z.string().min(6, { message: "パスワードを入力してください。" }),
});

async function signInAction(
  _: SignInState,
  formData: FormData
): Promise<SignInState> {
  const validated = signInSchema.safeParse(Object.fromEntries(formData));
  if (validated.error) {
    return {
      data: {
        email: (formData.get("email") ?? "") as string,
        password: (formData.get("password") ?? "") as string,
      },
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;
  const response = await signIn("credentials", { ...data, redirect: false });
  if (response?.ok) {
    return { data };
  }

  if (response?.error) {
    return {
      data,
      errors: { noField: [response.error] },
    };
  }
  return {
    data,
    errors: { noField: ["認証に失敗しました。"] },
  };
}

export default function LoginPage() {
  const { status: sessionStatus } = useSession();
  const [state, action, isPending] = useActionState(signInAction, {});

  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/");
    }
  }, [sessionStatus, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">ログイン</h1>
      <form action={action} className="flex w-full max-w-sm flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
            defaultValue={state.data?.email}
          />
          {!isPending && state.errors?.email && (
            <p className="mt-2 text-sm text-red-600">{state.errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            パスワード
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
            defaultValue={state.data?.password}
          />
          {!isPending && state.errors?.password && (
            <p className="mt-2 text-sm text-red-600">{state.errors.password}</p>
          )}
        </div>
        {!isPending && state.errors?.noField && (
          <p className="mt-2 text-sm text-red-600">{state.errors.noField}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="focus:shadow-outline w-fit rounded bg-gray-900 px-4 py-2 font-bold text-white hover:bg-gray-800 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50"
        >
          ログイン
        </button>
        <Link
          href="/sign_up"
          className="block text-gray-900 hover:text-gray-800"
        >
          新規登録
        </Link>
      </form>
    </div>
  );
}
