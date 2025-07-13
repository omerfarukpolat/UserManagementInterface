import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PAGINATION_MODE,
  SEARCH_PARAMS,
  USER_ROLE,
  VIEW_MODE,
} from '../constants/filters';
import { UserFilters, UserRole } from '../types/user.types';

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo((): UserFilters => {
    const currentPageParam = searchParams.get(SEARCH_PARAMS.CURRENT_PAGE);
    const currentPage = currentPageParam ? parseInt(currentPageParam) : 1;

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
      currentPage,
    };
  }, [searchParams]);

  const updateFiltersInUrl = useCallback(
    (newFilters: Partial<UserFilters>) => {
      const mergedFilters = { ...filters, ...newFilters };

      const params = new URLSearchParams();

      if (mergedFilters.search)
        params.set(SEARCH_PARAMS.SEARCH, mergedFilters.search);
      if (mergedFilters.role !== USER_ROLE.ALL)
        params.set(SEARCH_PARAMS.ROLE, mergedFilters.role);
      if (mergedFilters.viewMode !== VIEW_MODE.TABLE)
        params.set(SEARCH_PARAMS.VIEW_MODE, mergedFilters.viewMode);
      if (mergedFilters.paginationMode !== PAGINATION_MODE.PAGINATED)
        params.set(SEARCH_PARAMS.PAGINATION_MODE, mergedFilters.paginationMode);
      if (mergedFilters.itemsPerPage !== 10)
        params.set(
          SEARCH_PARAMS.ITEMS_PER_PAGE,
          mergedFilters.itemsPerPage.toString()
        );
      params.set(
        SEARCH_PARAMS.CURRENT_PAGE,
        mergedFilters.currentPage.toString()
      );
      setSearchParams(params);
    },
    [filters, setSearchParams]
  );

  return {
    filters,
    updateFilters: updateFiltersInUrl,
  };
};
