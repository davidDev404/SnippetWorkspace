import { create } from "zustand";

interface SnippetState {
    snippetNames: string[];
    selectedSnippet: string | null;
    addSnippetName: (name: string) => void;
    setSnippetNames: (names: string[]) => void;
    setSelectedSnippet: (name: string) => void;
}

export const useSnippetStore = create<SnippetState>((set) => ({
    snippetNames: [],
    selectedSnippet: null,
    addSnippetName: (name) => 
        set((state) => ({
            snippetNames: [...state.snippetNames, name]
        })),
    setSnippetNames: (names) => set({ snippetNames: names }),
    setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet }),

}));