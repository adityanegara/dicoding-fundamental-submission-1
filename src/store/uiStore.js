import create from "zustand";

const uiStore = create((set) => ({
  isArchived: false,
  toggleArchived: () => {
    set(() => ({
      isArchived: true,
    }));
  },
  toggleAll: () => {
    set(() => ({
      isArchived: false,
    }));
  },
}));

export default uiStore;
