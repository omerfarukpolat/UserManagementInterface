import { faker } from '@faker-js/faker';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import { useUrlParams } from '../../hooks/useUrlParams';
import { initializeUsers } from '../../services/userService';
import { User, UserRole } from '../../types/user.types';
import AddUserForm from './AddUserForm';
import MainPageComponent from './Main.page.component';

const LOCAL_STORAGE_KEY = 'users';

const MainPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { filters, updateFilters } = useUrlParams();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaginationChanging, setIsPaginationChanging] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  useEffect(() => {
    const loadUsers = () => {
      setIsLoading(true);
      setTimeout(() => {
        const localUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
        let loadedUsers: User[];
        if (localUsers) {
          loadedUsers = JSON.parse(localUsers);
        } else {
          loadedUsers = initializeUsers();
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loadedUsers));
        }
        setUsers(loadedUsers);
        setIsLoading(false);
      }, 500);
    };
    loadUsers();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    }
  }, [users, isLoading]);

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

  const handleAddUserClick = () => setIsAddUserModalOpen(true);
  const handleCloseAddUserModal = () => setIsAddUserModalOpen(false);
  const handleAddUserSubmit = (data: {
    name: string;
    email: string;
    password: string;
    role: string;
    active: boolean;
  }) => {
    const newUser: User & { latitude: number; longitude: number } = {
      id: faker.string.uuid(),
      name: data.name,
      email: data.email,
      role: data.role as UserRole,
      creationDate: new Date().toISOString(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    };
    setUsers(prev => [newUser, ...prev]);
    setIsAddUserModalOpen(false);
  };

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
