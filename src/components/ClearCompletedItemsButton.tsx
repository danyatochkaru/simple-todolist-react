import React from "react";
import {useDispatch} from "react-redux";
import {clearCompleted} from "../store/todo-list";

export default function ClearCompletedItemsButton() {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(clearCompleted())
    }

    return <button
        className={'transition border-none text-red-300 hover:text-red-500 active:text-red-700'}
        onClick={handleClick}
    >Очистить завершенные</button>
}