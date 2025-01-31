import { DefaultSession } from "next-auth";

export type State = {
  data?: {
    url?: string;
    auth?: string;
  };
  result?: { markdown: string; fileName: string };
  errors?: {
    url?: string[];
    auth?: string[];
    noField?: string[];
  };
};

export type SignInState = {
  data?: {
    email?: string;
    password?: string;
  };
  errors?: {
    email?: string[];
    password?: string[];
    noField?: string[];
  };
};

export type SignUpState = {
  data?: {
    email?: string;
    name?: string;
    password?: string;
  };
  errors?: {
    email?: string[];
    name?: string[];
    password?: string[];
    noField?: string[];
  };
};

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & { id?: string | null };
  }
}
