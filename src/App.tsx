import React, {useState} from 'react';
import InputForm from "./components/InputForm";
import {useSelector} from "react-redux";
import type {RootState} from "./store";
import ListItem from "./components/ListItem";
import EditingItem from "./components/EditingItem";
import ClearCompletedItemsButton from "./components/ClearCompletedItemsButton";

type FilterValues = 'Все' | 'Активные' | 'Завершенные'

function App() {
    const todoList = useSelector((state: RootState) => state.todoList)

    const [editing, setEditing] = useState<null | number>(null)
    const [filter, setFilter] = useState<FilterValues>('Все')

    return (
        <div className={'flex flex-col gap-4 items-center min-h-screen max-w-2xl w-full mx-auto mt-12'}>
            <h1 className={'font-bold text-xl'}>Список задач</h1>
            <InputForm/>
            <div className={'flex gap-2 w-full justify-between items-center'}>
                <div
                    className={'flex gap-2 *:px-2 *:py-1 *:transition-all *:rounded-lg *:border'}>
                    {(['Все', 'Активные', 'Завершенные'] as FilterValues[]).map(item => (
                        <button key={item}
                                className={'hover:bg-brand-4 ' + (filter === item
                                    ? 'border-brand-7 bg-brand-7 text-zinc-50'
                                    : 'border-brand-4 bg-brand-1 text-zinc-900 active:bg-brand-7 active:text-zinc-50')}
                                onClick={() => setFilter(item)}>{item}</button>
                    ))}
                </div>
                <ClearCompletedItemsButton/>
            </div>
            <ul className={'flex flex-col gap-2 w-full'}>
                {todoList.filter(todo => filter === 'Активные'
                    ? !todo.isCompleted
                    : filter === 'Завершенные'
                        ? todo.isCompleted
                        : true).map((todo) => editing === todo.id
                    ? <EditingItem key={todo.id} id={todo.id} name={todo.name} isCompleted={todo.isCompleted}
                                   disableEditing={() => setEditing(null)}/>
                    : <ListItem key={todo.id} id={todo.id} name={todo.name}
                                isCompleted={todo.isCompleted} enableEditing={() => {
                        setEditing(todo.id)
                    }}/>
                )}
            </ul>
            <div className={'flex gap-2 w-full'}>
                <p>Всего: {todoList.length}</p>
                <p>Активных: {todoList.filter(todo => !todo.isCompleted).length}</p>
                <p>Завершенных: {todoList.filter(todo => todo.isCompleted).length}</p>
            </div>
        </div>
    );
}

export default App;
