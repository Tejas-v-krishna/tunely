import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sidebarOpen: true,
    theme: 'dark', // 'dark' | 'neon' | 'minimal'
    toast: null,
    searchQuery: '',
    activeModal: null,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload
        },
        setTheme: (state, action) => {
            state.theme = action.payload
        },
        showToast: (state, action) => {
            state.toast = action.payload
        },
        clearToast: (state) => {
            state.toast = null
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        openModal: (state, action) => {
            state.activeModal = action.payload
        },
        closeModal: (state) => {
            state.activeModal = null
        },
    },
})

export const {
    toggleSidebar, setSidebarOpen, setTheme, showToast, clearToast,
    setSearchQuery, openModal, closeModal,
} = uiSlice.actions
export default uiSlice.reducer
