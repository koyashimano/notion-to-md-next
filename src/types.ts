export type User = {
  id: string;
  email: string;
  name: string;
  notion_token?: string;
  NotionAuthState?: NotionAuthState;
};

export type NotionAuthState = {
  id: string;
  user_id: string;
  state: string;
  created_at: Date;
};

export type State = {
  data?: {
    url?: string;
  };
  result?: { markdown: string; fileName: string };
  errors?: {
    url?: string[];
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
