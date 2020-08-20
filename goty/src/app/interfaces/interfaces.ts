export interface Game {
  id: string;
  name: string;
  votes: number;
  url: string;
}

export interface VoteResponse {
  ok: boolean;
  message: string;
}
