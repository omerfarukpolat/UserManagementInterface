import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserDetailsPageComponent from './UserDetails.page.component';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../store/slices/userSlice';

const UserDetailsPageContainer: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const user = useSelector((state: any) =>
    userId ? selectUserById(state, userId) : undefined
  );

  if (!user) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <h2>User not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return <UserDetailsPageComponent user={user} />;
};

export default UserDetailsPageContainer;
