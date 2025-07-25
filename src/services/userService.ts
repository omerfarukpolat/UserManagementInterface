import { faker } from '@faker-js/faker';
import { User, UserRole } from '../types/user.types';
import { UserWithCoords } from '../store/slices/userSlice';

const USER_ROLES: UserRole[] = ['admin', 'user', 'moderator', 'editor'];

export const generateFakeUsers = (count: number = 5000): UserWithCoords[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  return Array.from({ length: count }, _ => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: USER_ROLES[Math.floor(Math.random() * USER_ROLES.length)],
    creationDate: faker.date.past({ years: 5 }).toISOString(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    active: true,
  }));
};

export const getUsersFromStorage = (): User[] => {
  try {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveUsersToStorage = (users: User[]): void => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    // Do nothing
  }
};

export const addUser = (user: Omit<User, 'id' | 'creationDate'>): User => {
  const newUser: User = {
    ...user,
    id: faker.string.uuid(),
    creationDate: new Date().toISOString(),
  };

  const existingUsers = getUsersFromStorage();
  const updatedUsers = [...existingUsers, newUser];
  saveUsersToStorage(updatedUsers);

  return newUser;
};

export const initializeUsers = () => generateFakeUsers(5000);
