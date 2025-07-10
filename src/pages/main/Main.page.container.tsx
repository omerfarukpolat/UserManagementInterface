import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrlParams } from '../../hooks/useUrlParams';
import { initializeUsers } from '../../services/userService';
import { User, UserRole } from '../../types/user.types';

import MainPageComponent from './Main.page.component';

const MainPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { filters, updateFilters } = useUrlParams();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaginationChanging, setIsPaginationChanging] = useState(false);

  useEffect(() => {
    const loadUsers = () => {
      setIsLoading(true);
      setTimeout(() => {
        const loadedUsers = initializeUsers();
        setUsers(loadedUsers);
        setIsLoading(false);
      }, 500);
    };

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesRole = filters.role === 'all' || user.role === filters.role;

      return matchesSearch && matchesRole;
    });
  }, [users, filters.search, filters.role]);

  const paginatedUsers = useMemo(() => {
    if (filters.paginationMode === 'all') {
      return filteredUsers;
    }

    const startIndex = (filters.currentPage - 1) * filters.itemsPerPage;
    const endIndex = startIndex + filters.itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [
    filteredUsers,
    filters.paginationMode,
    filters.currentPage,
    filters.itemsPerPage,
  ]);

  const totalPages = Math.ceil(filteredUsers.length / filters.itemsPerPage);

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value, currentPage: 1 });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ role: e.target.value as UserRole | 'all', currentPage: 1 });
  };

  const handleViewModeChange = (mode: 'table' | 'card') => {
    updateFilters({ viewMode: mode });
  };

  const handlePaginationModeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('Pagination mode change triggered:', e.target.checked);
    if (isPaginationChanging) return;

    setIsPaginationChanging(true);

    setTimeout(() => {
      updateFilters({
        paginationMode: e.target.checked ? 'all' : 'paginated',
        currentPage: 1,
      });
      setIsPaginationChanging(false);
    }, 300);
  };

  const handlePageChange = (page: number) => {
    updateFilters({ currentPage: page });
  };

  const handleItemsPerPageChange = (itemsPerPage: 10 | 20) => {
    updateFilters({ itemsPerPage, currentPage: 1 });
  };

  const handleUserDetailsClick = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const handleAddUserClick = () => {};

  return (
    <>
      <MainPageComponent
        users={users}
        filteredUsers={filteredUsers}
        paginatedUsers={paginatedUsers}
        filters={filters}
        isLoading={isLoading}
        isPaginationChanging={isPaginationChanging}
        totalPages={totalPages}
        onSearchChange={handleSearchChange}
        onRoleChange={handleRoleChange}
        onViewModeChange={handleViewModeChange}
        onPaginationModeChange={handlePaginationModeChange}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        onUserDetailsClick={handleUserDetailsClick}
        onAddUserClick={handleAddUserClick}
      />
    </>
  );
};

export default MainPageContainer;
