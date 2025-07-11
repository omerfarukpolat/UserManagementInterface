import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user.types';
import {
  Card,
  CardHeader,
  UserName,
  CardContent,
  InfoRow,
  InfoLabel,
  InfoValue,
  DetailsButton,
} from './styled/UserCard.styled';
import { RoleBadge } from './styled/UserList.styled';

type UserCardProps = {
  user: User;
  onDetailsClick?: (userId: string) => void;
};

const UserCard: React.FC<UserCardProps> = ({ user, onDetailsClick }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDetailsClick = () => {
    if (onDetailsClick) {
      onDetailsClick(user.id);
    } else {
      navigate(`/user/${user.id}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <UserName>{user.name}</UserName>
        <RoleBadge role={user.role}>{user.role}</RoleBadge>
      </CardHeader>
      <CardContent>
        <InfoRow>
          <InfoLabel>Email:</InfoLabel>
          <InfoValue>{user.email}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Created:</InfoLabel>
          <InfoValue>{formatDate(user.creationDate)}</InfoValue>
        </InfoRow>
      </CardContent>
      <DetailsButton onClick={handleDetailsClick}>View Details</DetailsButton>
    </Card>
  );
};

export default UserCard;
