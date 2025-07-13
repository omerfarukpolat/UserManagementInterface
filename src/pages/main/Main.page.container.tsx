import React, { useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrlParams } from '../../hooks/useUrlParams';
import { initializeUsers } from '../../services/userService';
import { UserRole } from '../../types/user.types';
import MainPageComponent from './Main.page.component';
import Modal from '../../components/Modal';
import AddUserForm from './AddUserForm';
import { faker } from '@faker-js/faker';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUsers,
  addUser,
  selectUsers,
  UserWithCoords,
} from '../../store/slices/userSlice';
import { RootState } from '../../store/store';
import { debounce } from 'lodash';

const LOCAL_STORAGE_KEY = 'users';

const MainPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { filters, updateFilters } = useUrlParams();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => selectUsers(state));
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPaginationChanging, setIsPaginationChanging] = React.useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState(filters.search);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const localUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
      const localUsersArr = localUsers ? JSON.parse(localUsers) : [];
      let loadedUsers: UserWithCoords[];
      if (!localUsers || localUsersArr.length < 5000) {
        loadedUsers = initializeUsers();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loadedUsers));
      } else {
        loadedUsers = localUsersArr;
      }
      console.log('LocalStorage users:', loadedUsers);
      dispatch(setUsers(loadedUsers));
      setIsLoading(false);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      console.log('Redux users:', users);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    }
  }, [users, isLoading]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      updateFilters({ search: searchValue, currentPage: 1 });
    }, 300),
    [updateFilters]
  );

  // Update search term immediately for UI responsiveness
  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  // Optimized filtering with early returns and case-insensitive search
  const filteredUsers = useMemo(() => {
    if (users.length === 0) return [];

    const searchLower = filters.search.toLowerCase().trim();
    const roleFilter = filters.role;

    // If no filters applied, return all users
    if (!searchLower && roleFilter === 'all') {
      return users;
    }

    return users.filter(user => {
      // Role filter first (usually faster)
      if (roleFilter !== 'all' && user.role !== roleFilter) {
        return false;
      }

      // Search filter
      if (searchLower) {
        const nameMatch = user.name.toLowerCase().includes(searchLower);
        const emailMatch = user.email.toLowerCase().includes(searchLower);
        return nameMatch || emailMatch;
      }

      return true;
    });
  }, [users, filters.search, filters.role]);

  // Optimized pagination with early return
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

  // Optimized event handlers with useCallback
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
    },
    []
  );

  const handleRoleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateFilters({
        role: e.target.value as UserRole | 'all',
        currentPage: 1,
      });
    },
    [updateFilters]
  );

  const handleViewModeChange = useCallback(
    (mode: 'table' | 'card') => {
      updateFilters({ viewMode: mode });
    },
    [updateFilters]
  );

  const handlePaginationModeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isPaginationChanging) return;
      setIsPaginationChanging(true);
      setTimeout(() => {
        updateFilters({
          paginationMode: e.target.checked ? 'all' : 'paginated',
          currentPage: 1,
        });
        setIsPaginationChanging(false);
      }, 300);
    },
    [isPaginationChanging, updateFilters]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateFilters({ currentPage: page });
    },
    [updateFilters]
  );

  const handleItemsPerPageChange = useCallback(
    (itemsPerPage: 10 | 20) => {
      updateFilters({ itemsPerPage, currentPage: 1 });
    },
    [updateFilters]
  );

  const handleUserDetailsClick = useCallback(
    (userId: string) => {
      navigate(`/user/${userId}`);
    },
    [navigate]
  );

  const handleAddUserClick = useCallback(() => setIsAddUserModalOpen(true), []);
  const handleCloseAddUserModal = useCallback(
    () => setIsAddUserModalOpen(false),
    []
  );
  const handleAddUserSubmit = useCallback(
    (data: {
      name: string;
      email: string;
      password: string;
      role: string;
      active: boolean;
    }) => {
      const newUser: UserWithCoords = {
        id: faker.string.uuid(),
        name: data.name,
        email: data.email,
        role: data.role as UserRole,
        creationDate: new Date().toISOString(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        active: data.active,
      };
      dispatch(addUser(newUser));
      setIsAddUserModalOpen(false);
    },
    [dispatch]
  );

  return (
    <>
      <MainPageComponent
        users={users}
        filteredUsers={filteredUsers}
        paginatedUsers={paginatedUsers}
        filters={{ ...filters, search: searchTerm }}
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
      <Modal open={isAddUserModalOpen} onClose={handleCloseAddUserModal}>
        <AddUserForm
          onSubmit={handleAddUserSubmit}
          onCancel={handleCloseAddUserModal}
        />
      </Modal>
    </>
  );
};

export default MainPageContainer;
