export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  creationDate: string;
}

export type UserRole = 'admin' | 'user' | 'moderator' | 'editor';

export interface UserFilters {
  search: string;
  role: UserRole | 'all';
  viewMode: 'table' | 'card';
  paginationMode: 'paginated' | 'all';
  itemsPerPage: 10 | 20;
  currentPage: number;
}

export interface UserListState {
  users: User[];
  filters: UserFilters;
  isLoading: boolean;
}
