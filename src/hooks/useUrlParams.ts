import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SEARCH_PARAMS,
  PAGINATION_MODE,
  VIEW_MODE,
  USER_ROLE,
} from '../constants/filters';
import { UserFilters, UserRole } from '../types/user.types';

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getFiltersFromUrl = useCallback((): UserFilters => {
    return {
      search: searchParams.get(SEARCH_PARAMS.SEARCH) || '',
      role:
        (searchParams.get(SEARCH_PARAMS.ROLE) as
          | UserRole
          | typeof USER_ROLE.ALL) || USER_ROLE.ALL,
      viewMode:
        (searchParams.get(SEARCH_PARAMS.VIEW_MODE) as
          | typeof VIEW_MODE.TABLE
          | typeof VIEW_MODE.CARD) || VIEW_MODE.TABLE,
      paginationMode:
        (searchParams.get(SEARCH_PARAMS.PAGINATION_MODE) as
          | typeof PAGINATION_MODE.PAGINATED
          | typeof PAGINATION_MODE.ALL) || PAGINATION_MODE.PAGINATED,
      itemsPerPage: parseInt(
        searchParams.get(SEARCH_PARAMS.ITEMS_PER_PAGE) || '10'
      ) as 10 | 20,
      currentPage: parseInt(
        searchParams.get(SEARCH_PARAMS.CURRENT_PAGE) || '1'
      ),
    };
  }, [searchParams]);

  const updateFiltersInUrl = useCallback(
    (filters: Partial<UserFilters>) => {
      const currentFilters = getFiltersFromUrl();
      const newFilters = { ...currentFilters, ...filters };

      const params = new URLSearchParams();

      if (newFilters.search)
        params.set(SEARCH_PARAMS.SEARCH, newFilters.search);
      if (newFilters.role !== USER_ROLE.ALL)
        params.set(SEARCH_PARAMS.ROLE, newFilters.role);
      if (newFilters.viewMode !== VIEW_MODE.TABLE)
        params.set(SEARCH_PARAMS.VIEW_MODE, newFilters.viewMode);
      if (newFilters.paginationMode !== PAGINATION_MODE.PAGINATED)
        params.set(SEARCH_PARAMS.PAGINATION_MODE, newFilters.paginationMode);
      if (newFilters.itemsPerPage !== 10)
        params.set(
          SEARCH_PARAMS.ITEMS_PER_PAGE,
          newFilters.itemsPerPage.toString()
        );
      if (newFilters.currentPage !== 1)
        params.set(
          SEARCH_PARAMS.CURRENT_PAGE,
          newFilters.currentPage.toString()
        );

      setSearchParams(params);
    },
    [getFiltersFromUrl, setSearchParams]
  );

  return {
    filters: getFiltersFromUrl(),
    updateFilters: updateFiltersInUrl,
  };
};
