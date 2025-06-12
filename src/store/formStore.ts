// stores/formStore.ts
import { create } from "zustand";

interface FormState {
  editMode: boolean;
  setEditMode: (value: boolean) => void;

  idForEdit: string | null;
  setIdForEdit: (id: string | null) => void;

  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  editMode: false,
  setEditMode: (value) => set({ editMode: value }),

  idForEdit: null,
  setIdForEdit: (id) => set({ idForEdit: id }),

  modalOpen: false,
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
}));
