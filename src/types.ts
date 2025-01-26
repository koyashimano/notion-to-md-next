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
