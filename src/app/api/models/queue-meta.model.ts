export interface QueueMeta {
  play_time: number;
  genres: { [key: string]: number };
  total: number;
  users: { [key: string]: number };
}
