import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    tasksList: [],
    selectedTask: {},
    isLoading: false,
    error: ''
}

const api_url = 'http://localhost:8000/tasks';

//GET
export const getTasksFromServer = createAsyncThunk(
    "tasksFromServer",
    async (_,{rejectWithValue}) => {
        const response = await fetch(api_url);
        if(response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            return rejectWithValue({error: 'No tasks found'})
        }
    } 
) 

//POST
export const addTasksToServer = createAsyncThunk(
    "tasksToServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(api_url, options);
        if(response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            return rejectWithValue({error: 'Task Not Added'})
        }
    } 
) 

//PATCH
export const updateTasksInServer = createAsyncThunk(
    "tasksInServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(`${api_url}/${task.id}`, options);
        if(response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            return rejectWithValue({error: 'Task Not Updated'})
        }
    } 
) 

//DELETE
export const deleteTasksFromServer = createAsyncThunk(
    "deleteTasksFromServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method: 'DELETE',
        }
        const response = await fetch(`${api_url}/${task.id}`, options);
        if(response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            return rejectWithValue({error: 'Task Not Deleted'})
        }
    } 
) 

const TasksSlice = createSlice({
    name: 'TasksSlice',
    initialState,
    reducers: {
        addTaskToList: (state, action) => {
            const id = Math.random() * 100;
            let task = {...action.payload, id};
            state.tasksList.push(task);
        },
        removeTaskFromList: (state, action) => {
            state.tasksList = state.tasksList.filter((task) => task.id !== action.payload.id)
        },
        updateTaskInList: (state, action) => {
            state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getTasksFromServer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTasksFromServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.tasksList = action.payload;
            })
            .addCase(getTasksFromServer.rejected, (state, action) => {
                state.error = action.payload.error;
                state.isLoading = false;
                state.tasksList = [];
            })
            .addCase(addTasksToServer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTasksToServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.tasksList.push(action.payload);
            })
            .addCase(addTasksToServer.rejected, (state, action) => {
                state.error = action.payload.error;
                state.isLoading = false;
            })
            .addCase(updateTasksInServer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTasksInServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
            })
            .addCase(updateTasksInServer.rejected, (state, action) => {
                state.error = action.payload.error;
                state.isLoading = false;
            })
            .addCase(deleteTasksFromServer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTasksFromServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
            })
            .addCase(deleteTasksFromServer.rejected, (state, action) => {
                state.error = action.payload.error;
                state.isLoading = false;
            })
    }
});

export const {addTaskToList, removeTaskFromList, updateTaskInList, setSelectedTask} = TasksSlice.actions;

export default TasksSlice.reducer;
