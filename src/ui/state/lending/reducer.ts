import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export interface LendingState {
  poolTokenDenom: string;
}

export const initialState: LendingState = {
  poolTokenDenom: 'ibc/B9E4FD154C92D3A23BEA029906C4C5FF2FE74CB7E3A058290B77197A263CF88B'
};

const slice = createSlice({
  name: 'lending',
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    update(
      state,
      action: {
        payload: {
          poolTokenDenom?: string;
        };
      }
    ) {
      const { payload } = action;
      state = Object.assign({}, state, payload);
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, (state) => {
      // todo
    });
  }
});

export const LendingActions = slice.actions;
export default slice.reducer;
