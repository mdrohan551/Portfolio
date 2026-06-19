import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
}

// ✅ SSR safe initial theme getter
const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
};

const initialState: ThemeState = {
    theme: getInitialTheme()
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            
            // Update LocalStorage & DOM immediately
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', state.theme);
                applyThemeToDOM(state.theme);
            }
        },
        // ✅ New action to sync theme on initial load/reload
        initTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
            if (typeof window !== 'undefined') {
                applyThemeToDOM(action.payload);
            }
        }
    }
});

// Helper function to keep code clean
const applyThemeToDOM = (theme: Theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

export const { toggleTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;