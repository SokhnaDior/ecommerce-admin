import {create} from "zustand";
interface useStoreModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};
export const useStoreModal = create<useStoreModalStore>((set)=>({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: true }),
}));
// pour les ouverture et fermeture par defaut