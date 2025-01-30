"use client";

import { signUpAction } from "@/actions/sign_up";
import Link from "next/link";
import { useActionState } from "react";

export default function SignUpPage() {
  const [state, action, isPending] = useActionState(signUpAction, {});

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">会員登録</h1>
      <form
        action={action}
        className="flex w-full max-w-sm flex-col gap-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
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
            htmlFor="name"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            名前
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
            defaultValue={state.data?.name}
          />
          {!isPending && state.errors?.name && (
            <p className="mt-2 text-sm text-red-600">{state.errors.name}</p>
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
          className="focus:shadow-outline rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700 focus:outline-none"
        >
          登録
        </button>
        <Link
          href="/login"
          className="block text-indigo-600 hover:text-indigo-800"
        >
          ログイン
        </Link>
      </form>
    </div>
  );
}
