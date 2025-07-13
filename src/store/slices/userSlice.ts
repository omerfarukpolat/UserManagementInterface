import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user.types';

export type UserWithCoords = User & {
  latitude?: number;
  longitude?: number;
  active?: boolean;
};

interface UserState {
  users: UserWithCoords[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserWithCoords[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<UserWithCoords>) {
      state.users.unshift(action.payload);
    },
  },
});

export const { setUsers, addUser } = userSlice.actions;
export default userSlice.reducer;

export const selectUsers = (state: { users: UserState }) => state.users.users;

export const selectUserById = (state: { users: UserState }, id: string) =>
  state.users.users.find(u => u.id === id);
