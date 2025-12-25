import { create } from "zustand";

interface SnippetState {
    snippetNames: string[];
    addSnippetName: (name: string) => void;
    setSnippetNames: (names: string[]) => void;
}

export const useSnippetStore = create<SnippetState>((set) => ({
    snippetNames: [],
    addSnippetName: (name) => 
        set((state) => ({
            snippetNames: [...state.snippetNames, name]
        })),
    setSnippetNames: (names) => set({ snippetNames: names })
}));