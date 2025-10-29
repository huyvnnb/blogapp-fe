export interface PublicPostStats {
    total: number;
    approve: number;
    pending: number;
    reject: number;
}

export interface DayStat {
  date: string;
  count: number;
}