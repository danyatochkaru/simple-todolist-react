import React, {useState} from 'react';
import './App.css';
import InputForm from "./components/InputForm";
import {useSelector} from "react-redux";
import type {RootState} from "./store";
import ListItem from "./components/ListItem";
import EditingItem from "./components/EditingItem";

function App() {

    const todoList = useSelector((state: RootState) => state.todoList)

    const [editing, setEditing] = useState<null | number>(null)

    return (
        <div className={'flex flex-col gap-4 items-center min-h-screen max-w-2xl w-full mx-auto mt-12'}>
            <h1 className={'font-bold text-xl'}>Список задач</h1>
            <InputForm/>
            <ul className={'flex flex-col gap-2 w-full'}>
                {todoList.map((todo) => editing === todo.id
                    ? <EditingItem key={todo.id} id={todo.id} name={todo.name} isCompleted={todo.isCompleted}
                                   disableEditing={() => setEditing(null)}/>
                    : <ListItem key={todo.id} id={todo.id} name={todo.name}
                                isCompleted={todo.isCompleted} enableEditing={() => {
                        setEditing(todo.id)
                    }}/>
                )}
            </ul>
        </div>
    );
}

export default App;
