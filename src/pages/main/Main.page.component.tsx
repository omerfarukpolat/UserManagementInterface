import React from 'react';
import {
  UserListContainer,
  Header,
  HeaderTitle,
  ControlsSection,
  SearchInput,
  FilterSelect,
  ViewToggle,
  ToggleButton,
  PaginationToggle,
  ToggleSwitch,
  ToggleInput,
  ContentArea,
  UserGrid,
  UserTable,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
  PaginationContainer,
  PaginationButton,
  LoadingSpinner,
  RoleBadge,
  TableActionButton,
} from '../../components/styled/UserList.styled';
import UserCard from '../../components/UserCard';
import { VIEW_MODE, PAGINATION_MODE, USER_ROLE } from '../../constants/filters';
import { User, UserFilters } from '../../types/user.types';

type MainPageComponentProps = {
  users: User[];
  filteredUsers: User[];
  paginatedUsers: User[];
  filters: UserFilters;
  isLoading: boolean;
  isPaginationChanging: boolean;
  totalPages: number;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onViewModeChange: (mode: 'table' | 'card') => void;
  onPaginationModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPageChange: (page: number) => void;
  onUserDetailsClick: (userId: string) => void;
  onItemsPerPageChange: (itemsPerPage: 10 | 20) => void;
  onAddUserClick: () => void;
};

const MainPageComponent: React.FC<MainPageComponentProps> = ({
  paginatedUsers,
  filters,
  isLoading,
  isPaginationChanging,
  totalPages,
  onSearchChange,
  onRoleChange,
  onViewModeChange,
  onPaginationModeChange,
  onPageChange,
  onUserDetailsClick,
  onItemsPerPageChange,
  onAddUserClick,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <UserListContainer>
        <LoadingSpinner>Users are Loading</LoadingSpinner>
      </UserListContainer>
    );
  }

  return (
    <UserListContainer>
      <Header>
        <HeaderTitle>User List</HeaderTitle>
      </Header>

      <ControlsSection>
        <SearchInput
          type='text'
          placeholder='Search a user...'
          value={filters.search}
          onChange={onSearchChange}
        />

        <FilterSelect value={filters.role} onChange={onRoleChange}>
          <option value={USER_ROLE.ALL}>All Roles</option>
          <option value={USER_ROLE.ADMIN}>Admin</option>
          <option value={USER_ROLE.USER}>User</option>
          <option value={USER_ROLE.MODERATOR}>Moderator</option>
          <option value={USER_ROLE.EDITOR}>Editor</option>
        </FilterSelect>

        <ViewToggle>
          <ToggleButton
            active={filters.viewMode === VIEW_MODE.TABLE}
            onClick={() => onViewModeChange(VIEW_MODE.TABLE)}
          >
            Table
          </ToggleButton>
          <ToggleButton
            active={filters.viewMode === VIEW_MODE.CARD}
            onClick={() => onViewModeChange(VIEW_MODE.CARD)}
          >
            Card
          </ToggleButton>
        </ViewToggle>

        <PaginationToggle>
          <span>Pagination:</span>
          <ToggleInput
            type='checkbox'
            checked={filters.paginationMode === PAGINATION_MODE.PAGINATED}
            onChange={onPaginationModeChange}
            id='pagination-toggle'
          />
          <ToggleSwitch
            htmlFor='pagination-toggle'
            style={{
              opacity: isPaginationChanging ? 0.5 : 1,
              cursor: isPaginationChanging ? 'not-allowed' : 'pointer',
            }}
            onClick={e => {
              if (isPaginationChanging) {
                e.preventDefault();
                return;
              }
              const checkbox = document.getElementById(
                'pagination-toggle'
              ) as HTMLInputElement;
              if (checkbox) {
                checkbox.checked = !checkbox.checked;
                onPaginationModeChange({ target: checkbox } as any);
              }
            }}
          />
        </PaginationToggle>
        <TableActionButton variant={'outlined'} onClick={onAddUserClick}>
          ➕ Add User
        </TableActionButton>
      </ControlsSection>

      <ContentArea>
        {isPaginationChanging ? (
          <LoadingSpinner>Changing pagination mode...</LoadingSpinner>
        ) : filters.viewMode === VIEW_MODE.CARD ? (
          <UserGrid>
            {paginatedUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onDetailsClick={() => onUserDetailsClick(user.id)}
              />
            ))}
          </UserGrid>
        ) : (
          <UserTable>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>E-mail</TableHeaderCell>
                  <TableHeaderCell>Role</TableHeaderCell>
                  <TableHeaderCell>Creation Date</TableHeaderCell>
                  <TableHeaderCell></TableHeaderCell>
                </TableRow>
              </TableHeader>
              <tbody>
                {paginatedUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <RoleBadge role={user.role}>{user.role}</RoleBadge>
                    </TableCell>
                    <TableCell>{formatDate(user.creationDate)}</TableCell>
                    <TableCell>
                      <TableActionButton
                        onClick={() => onUserDetailsClick(user.id)}
                      >
                        Details
                      </TableActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </UserTable>
        )}
      </ContentArea>

      {filters.paginationMode === PAGINATION_MODE.PAGINATED &&
        totalPages > 1 && (
          <PaginationContainer>
            <PaginationButton
              onClick={() => onPageChange(filters.currentPage - 1)}
              disabled={filters.currentPage === 1}
            >
              Prev
            </PaginationButton>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page =
                Math.max(1, Math.min(totalPages - 4, filters.currentPage - 2)) +
                i;
              return (
                <PaginationButton
                  key={page}
                  active={page === filters.currentPage}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </PaginationButton>
              );
            })}

            <PaginationButton
              onClick={() => onPageChange(filters.currentPage + 1)}
              disabled={filters.currentPage === totalPages}
            >
              Next
            </PaginationButton>
            {filters.paginationMode === PAGINATION_MODE.PAGINATED && (
              <FilterSelect
                value={filters.itemsPerPage}
                onChange={e =>
                  onItemsPerPageChange(parseInt(e.target.value) as 10 | 20)
                }
              >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </FilterSelect>
            )}
          </PaginationContainer>
        )}
    </UserListContainer>
  );
};

export default MainPageComponent;
