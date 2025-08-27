import { AppState } from '..';
import { useAppSelector } from '../hooks';

export function useStakeState(): AppState['stake'] {
  return useAppSelector((state) => state.stake);
}
