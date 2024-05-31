import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/TasksSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer
    },
})