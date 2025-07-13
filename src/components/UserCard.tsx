import React from 'react';
import { User } from '../types/user.types';
import { RoleBadge } from './styled/UserList.styled';
import {
  UserCardContainer,
  UserCardHeader,
  UserCardName,
  UserCardEmail,
  UserCardRoleSection,
  UserCardFooter,
} from './styled/VirtualScrolling.styled';

interface UserCardProps {
  user: User;
  onDetailsClick: () => void;
  minHeight?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onDetailsClick,
  minHeight,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <UserCardContainer onClick={onDetailsClick} minHeight={minHeight}>
      <UserCardHeader>
        <UserCardName>{user.name}</UserCardName>
        <UserCardEmail>{user.email}</UserCardEmail>
      </UserCardHeader>

      <UserCardRoleSection>
        <RoleBadge role={user.role}>{user.role}</RoleBadge>
      </UserCardRoleSection>

      <UserCardFooter>Created: {formatDate(user.creationDate)}</UserCardFooter>
    </UserCardContainer>
  );
};

export default UserCard;
