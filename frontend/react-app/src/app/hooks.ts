import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store/store';

// Типизированная версия useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;