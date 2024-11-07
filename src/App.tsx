import React, {useState} from 'react';
import InputForm from "./components/InputForm";
import {useSelector} from "react-redux";
import type {RootState} from "./store";
import ClearCompletedItemsButton from "./components/ClearCompletedItemsButton";
import List from "./components/List";

type FilterValues = 'Все' | 'Активные' | 'Завершенные'

function App() {
    const todoList = useSelector((state: RootState) => state.todoList)

    const [filter, setFilter] = useState<FilterValues>('Все')

    return (
        <div
            className={'flex flex-col gap-4 items-center max-w-2xl w-full mx-auto py-10 max-h-dvh h-full overflow-hidden'}>
            <h1 className={'font-bold text-xl'}>Список задач</h1>
            <InputForm/>
            <div className={'flex gap-2 w-full justify-between items-center'}>
                <div
                    className={'flex gap-2 *:px-2 *:py-1 *:transition-all *:rounded-lg *:border'}>
                    {(['Все', 'Активные', 'Завершенные'] as FilterValues[]).map(item => (
                        <button key={item}
                                className={'hover:bg-brand-5 ' + (filter === item
                                    ? 'border-brand-7 bg-brand-7 text-zinc-50'
                                    : 'border-brand-4 bg-brand-1 text-zinc-900 active:bg-brand-7 active:text-zinc-50')}
                                onClick={() => setFilter(item)}>{item}</button>
                    ))}
                </div>
                <ClearCompletedItemsButton/>
            </div>
            <List todoList={todoList.filter(todo => filter === 'Активные'
                ? !todo.isCompleted
                : filter === 'Завершенные'
                    ? todo.isCompleted
                    : true)}/>
            <div className={'flex gap-2 w-full'}>
                <p>Всего: {todoList.length}</p>
                <p>Активных: {todoList.filter(todo => !todo.isCompleted).length}</p>
                <p>Завершенных: {todoList.filter(todo => todo.isCompleted).length}</p>
            </div>
        </div>
    );
}

export default App;
