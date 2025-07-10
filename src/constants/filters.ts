export const SEARCH_PARAMS = {
  SEARCH: 'search',
  ROLE: 'role',
  VIEW_MODE: 'viewMode',
  PAGINATION_MODE: 'paginationMode',
  ITEMS_PER_PAGE: 'itemsPerPage',
  CURRENT_PAGE: 'currentPage',
} as const;

export const PAGINATION_MODE = {
  PAGINATED: 'paginated',
  ALL: 'all',
} as const;

export const VIEW_MODE = {
  TABLE: 'table',
  CARD: 'card',
} as const;

export const USER_ROLE = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
  EDITOR: 'editor',
  ALL: 'all',
} as const;
