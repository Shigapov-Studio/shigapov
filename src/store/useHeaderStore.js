import { create } from 'zustand';

const useHeaderStore = create((set) => ({
  headerHeight: 0,
  setHeaderHeight: (height) => set({ headerHeight: height })
}));

export default useHeaderStore;