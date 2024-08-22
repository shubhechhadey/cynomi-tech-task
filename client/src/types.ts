export interface SleepEntry {
  id?: string;
  userName: string;
  gender: string;
  sleepDuration: number;
  date: string;
}

export interface User {
  id: number;
  userName: string;
  gender: string;
  Sleep: SleepEntry[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
