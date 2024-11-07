import EditingItem from "./EditingItem";
import ListItem from "./ListItem";
import React, {useState} from "react";
import {TodoListState} from "../store/todo-list";
import {IconCircleOff} from "@tabler/icons-react";

type Props = {
    todoList: TodoListState[],
}

export default function List({todoList,}: Props) {
    const [editing, setEditing] = useState<null | number>(null)

    return <ul className={'flex flex-col gap-2 w-full p-4 overflow-y-auto border border-brand-1 rounded-lg'}>
        {todoList.length === 0
            ? <div className={'flex flex-col gap-2 justify-center items-center'}>
                <IconCircleOff size={42} className={'text-zinc-900'}/>
                <p className={'text-lg'}>Задачи не найдены</p>
            </div>
            : todoList.map((todo) => editing === todo.id
                ? <EditingItem key={todo.id} id={todo.id} name={todo.name} isCompleted={todo.isCompleted}
                               disableEditing={() => setEditing(null)}/>
                : <ListItem key={todo.id} id={todo.id} name={todo.name}
                            isCompleted={todo.isCompleted} enableEditing={() => {
                    setEditing(todo.id)
                }}/>
            )}
    </ul>
}