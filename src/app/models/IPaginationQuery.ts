export interface IPaginationQuery {
  filter: string;
  sortColumn: string;
  sortDirection: string;
  pageIndex: number;
  pageSize: number;
}
