import React, {SyntheticEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {appendItem} from "../store/todo-list";

export default function InputForm() {
    const dispatch = useDispatch()

    const [value, setValue] = useState('')

    const formSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (value === '') {
            return
        }
        dispatch(appendItem(value))
        setValue('')
    }

    return <form onSubmit={formSubmit}
                 className={'w-full flex gap-2 justify-center items-center h-fit'}>
        <input value={value}
               onChange={e => setValue(e.target.value)}
               type={'text'}
               placeholder={'Введите задачу'}
               className={'flex-1 p-2 transition rounded-lg border-2 border-brand-6 bg-zinc-50 outline-none hover:border-brand-4 focus:bg-zinc-100 focus:border-brand-4'}
        />
        <button type={'submit'}
                className={'p-2 transition rounded-lg border-none bg-brand-6 text-zinc-50 hover:bg-brand-4'}>Добавить
        </button>
    </form>
}