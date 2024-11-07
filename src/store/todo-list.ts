import {createSlice} from '@reduxjs/toolkit'

export interface TodoListState {
    id: number
    name: string
    isCompleted: boolean
}

const initialState: TodoListState[] = [
    {
        id: 2,
        name: 'Task 2',
        isCompleted: false,
    },
    {
        id: 1,
        name: 'Task 1',
        isCompleted: true,
    },
]

export const todoListSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        appendItem: (state, action) => {
            return [{id: Date.now(), name: action.payload, isCompleted: false}, ...state]
        },
        removeItem: (state, action) => {
            return state.filter(item => item.id !== action.payload)
        },
        toggleComplete: (state, action) => {
            return state.map(item => action.payload === item.id ? {...item, isCompleted: !item.isCompleted} : item)
        },
        updateItem: (state, action) => {
            return state.map(item => item.id === action.payload.id ? {...item, name: action.payload.name} : item)
        },
    },
})

export const {appendItem, removeItem, toggleComplete, updateItem} = todoListSlice.actions

export default todoListSlice.reducer