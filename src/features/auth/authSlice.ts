import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  serverUser: BaseUser | null;
}

const initialState: AuthState = {
  serverUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateServerUser: (state, action: PayloadAction<BaseUser>) => {
      state.serverUser = action.payload;
    },

    removerServerUser: (state) => {
      state.serverUser = null;
    },
  },
});

export const { updateServerUser, removerServerUser } = authSlice.actions;
export default authSlice.reducer;
