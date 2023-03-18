export interface IStandardCollectionApiResponse<TItem> {
  results: TItem[];
  count: number;
  next: string;
  previous: string;
}
