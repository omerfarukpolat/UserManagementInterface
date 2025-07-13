import React, { useRef } from 'react';
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
  PaginationContainer,
  PaginationButton,
  LoadingSpinner,
  RoleBadge,
  TableActionButton,
} from '../../components/styled/UserList.styled';
import {
  VirtualScrollContainer,
  VirtualContentWrapper,
  VirtualItemsContainer,
  VirtualTableContainer,
  VirtualTableContent,
  VirtualTableInner,
  VirtualTableRowFixed,
  VirtualSpacerRow,
  VirtualSpacerCell,
  EnhancedTable,
  EnhancedTableHeader,
  EnhancedTableHeaderRow,
  EnhancedTableHeaderCell,
  EnhancedTableBody,
  EnhancedTableRow,
  EnhancedTableCell,
} from '../../components/styled/VirtualScrolling.styled';
import UserCard from '../../components/UserCard';
import { VIEW_MODE, PAGINATION_MODE, USER_ROLE } from '../../constants/filters';
import { User, UserFilters } from '../../types/user.types';
import { useVirtualScrolling } from '../../hooks/useVirtualScrolling';

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
  filteredUsers,
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const tableVirtual = useVirtualScrolling({
    items:
      filters.paginationMode === PAGINATION_MODE.ALL
        ? filteredUsers
        : paginatedUsers,
    itemHeight: 60,
    containerHeight: 600,
    overscan: 10,
  });

  const cardVirtual = useVirtualScrolling({
    items:
      filters.paginationMode === PAGINATION_MODE.ALL
        ? filteredUsers
        : paginatedUsers,
    itemHeight: 200,
    containerHeight: 600,
    overscan: 5,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (filters.viewMode === VIEW_MODE.TABLE) {
      tableVirtual.setScrollTop(scrollTop);
    } else {
      cardVirtual.setScrollTop(scrollTop);
    }
  };

  if (isLoading) {
    return (
      <UserListContainer>
        <LoadingSpinner>Users are Loading</LoadingSpinner>
      </UserListContainer>
    );
  }

  const shouldUseVirtualScrolling =
    filters.paginationMode === PAGINATION_MODE.ALL &&
    filteredUsers.length > 100;

  return (
    <UserListContainer>
      <Header>
        <HeaderTitle>User List)</HeaderTitle>
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
          shouldUseVirtualScrolling ? (
            <VirtualScrollContainer
              ref={scrollContainerRef}
              onScroll={handleScroll}
            >
              <VirtualContentWrapper totalHeight={cardVirtual.totalHeight}>
                <VirtualItemsContainer
                  translateY={cardVirtual.startIndex * 200}
                >
                  <UserGrid>
                    {cardVirtual.virtualItems.map(user => (
                      <UserCard
                        key={user.id}
                        user={user}
                        onDetailsClick={() => onUserDetailsClick(user.id)}
                        minHeight='200px'
                      />
                    ))}
                  </UserGrid>
                </VirtualItemsContainer>
              </VirtualContentWrapper>
            </VirtualScrollContainer>
          ) : (
            <UserGrid>
              {paginatedUsers.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onDetailsClick={() => onUserDetailsClick(user.id)}
                />
              ))}
            </UserGrid>
          )
        ) : shouldUseVirtualScrolling ? (
          <VirtualTableContainer onScroll={handleScroll}>
            <EnhancedTable>
              <EnhancedTableHeader>
                <EnhancedTableHeaderRow>
                  <EnhancedTableHeaderCell align='left' width='20%'>
                    Name
                  </EnhancedTableHeaderCell>
                  <EnhancedTableHeaderCell align='left' width='30%'>
                    E-mail
                  </EnhancedTableHeaderCell>
                  <EnhancedTableHeaderCell align='center' width='17%'>
                    Role
                  </EnhancedTableHeaderCell>
                  <EnhancedTableHeaderCell align='left' width='20%'>
                    Creation Date
                  </EnhancedTableHeaderCell>
                  <EnhancedTableHeaderCell align='center' width='20%'>
                    Actions
                  </EnhancedTableHeaderCell>
                </EnhancedTableHeaderRow>
              </EnhancedTableHeader>
              <EnhancedTableBody>
                <VirtualSpacerRow totalHeight={tableVirtual.totalHeight}>
                  <VirtualSpacerCell colSpan={5}>
                    <VirtualTableContent
                      translateY={tableVirtual.startIndex * 60}
                    >
                      <VirtualTableInner>
                        <tbody>
                          {tableVirtual.virtualItems.map(user => (
                            <VirtualTableRowFixed key={user.id}>
                              <EnhancedTableCell align='left'>
                                {user.name}
                              </EnhancedTableCell>
                              <EnhancedTableCell align='left'>
                                {user.email}
                              </EnhancedTableCell>
                              <EnhancedTableCell align='center'>
                                <RoleBadge role={user.role}>
                                  {user.role}
                                </RoleBadge>
                              </EnhancedTableCell>
                              <EnhancedTableCell align='left'>
                                {formatDate(user.creationDate)}
                              </EnhancedTableCell>
                              <EnhancedTableCell align='center'>
                                <TableActionButton
                                  onClick={() => onUserDetailsClick(user.id)}
                                >
                                  Details
                                </TableActionButton>
                              </EnhancedTableCell>
                            </VirtualTableRowFixed>
                          ))}
                        </tbody>
                      </VirtualTableInner>
                    </VirtualTableContent>
                  </VirtualSpacerCell>
                </VirtualSpacerRow>
              </EnhancedTableBody>
            </EnhancedTable>
          </VirtualTableContainer>
        ) : (
          <VirtualTableContainer>
            <EnhancedTable>
              <EnhancedTableHeader>
                <EnhancedTableHeaderRow>
                  <EnhancedTableHeaderCell align='left' width='25%'>
                    Name
                  </EnhancedTableHeaderCell>
                  <EnhancedTableHeaderCell align='left' width='30%'>
                    E-mail
                  </EnhancedTableHeaderCell>
                  <EnhancedTableHeaderCell align='center' width='15%'>
                    Role
                  </EnhancedTableHeaderCell>
                  <EnhancedTableHeaderCell align='left' width='20%'>
                    Creation Date
                  </EnhancedTableHeaderCell>
                  <EnhancedTableHeaderCell align='center' width='10%'>
                    Actions
                  </EnhancedTableHeaderCell>
                </EnhancedTableHeaderRow>
              </EnhancedTableHeader>
              <EnhancedTableBody>
                {paginatedUsers.map(user => (
                  <EnhancedTableRow key={user.id}>
                    <EnhancedTableCell align='left'>
                      {user.name}
                    </EnhancedTableCell>
                    <EnhancedTableCell align='left'>
                      {user.email}
                    </EnhancedTableCell>
                    <EnhancedTableCell align='center'>
                      <RoleBadge role={user.role}>{user.role}</RoleBadge>
                    </EnhancedTableCell>
                    <EnhancedTableCell align='left'>
                      {formatDate(user.creationDate)}
                    </EnhancedTableCell>
                    <EnhancedTableCell align='center'>
                      <TableActionButton
                        onClick={() => onUserDetailsClick(user.id)}
                      >
                        Details
                      </TableActionButton>
                    </EnhancedTableCell>
                  </EnhancedTableRow>
                ))}
              </EnhancedTableBody>
            </EnhancedTable>
          </VirtualTableContainer>
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
