export interface IStandardCollectionApiResponse<TItem> {
  content: TItem[];
  count: number;
  next: string;
  previous: string;
}
