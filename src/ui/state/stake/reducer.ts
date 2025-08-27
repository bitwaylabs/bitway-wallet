import { Validator } from '@/ui/services/staking/types';
import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from '../global/actions';

export enum OperateType {
  delegate = 'delegate',
  undelegate = 'undelegate',
  redelegate = 'redelegate',
  claim = 'claim'
}

export const buttonList = [
  {
    label: 'Delegate',
    key: OperateType.delegate
  },
  {
    label: 'Undelegate',
    key: OperateType.undelegate
  },
  {
    label: 'Redelegate',
    key: OperateType.redelegate
  },
  {
    label: 'Claim',
    key: OperateType.claim
  }
];

export interface StakeState {
  validatorList: Validator[];
  validator: Validator | undefined;
  validatorDst: Validator | undefined;
  amount: string;
  operateType: OperateType;
}

export const initialState: StakeState = {
  validatorList: [],
  validator: undefined,
  validatorDst: undefined,
  amount: '',
  operateType: OperateType.delegate
};

const slice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    reset(state) {
      return initialState;
    },
    updateStakeState(
      state,
      action: {
        payload: {
          validatorList?: Validator[];
          validator?: Validator | undefined;
          validatorDst?: Validator | undefined;
          amount?: string;
          operateType?: OperateType;
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

export const stakeActions = slice.actions;
export default slice.reducer;
