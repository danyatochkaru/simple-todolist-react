import ToggleCompletedButton from "./ToggleCompletedButton";
import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {IconDeviceFloppy, IconX} from "@tabler/icons-react";
import {useDispatch} from "react-redux";
import {updateItem} from "../store/todo-list";

type Props = { id: number, name: string, isCompleted?: boolean, disableEditing: () => void }

export default function EditingItem({isCompleted, id, name, disableEditing}: Props) {
    const [value, setValue] = useState(name)
    const ref = useRef<HTMLLIElement>(null)

    const dispatch = useDispatch()

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault()

        if (value.trim() === '' || value.trim() === name) {
            disableEditing()
            return
        }

        dispatch(updateItem({id, name: value.trim()}))
        disableEditing()
    }

    useEffect(() => {
        const abortEventListeners = new AbortController()

        document.addEventListener('mousedown', e => {
            if (ref.current && !ref.current.contains(e.target as HTMLLIElement)) {
                disableEditing()
            }
        }, {signal: abortEventListeners.signal});

        return () => {
            abortEventListeners.abort()
        }
    }, [disableEditing]);


    return <li className={'flex gap-2 w-full items-center p-2 rounded bg-brand-0'} ref={ref}>
        <ToggleCompletedButton isCompleted={!!isCompleted} itemId={id}/>
        <form onSubmit={handleSubmit} className={'flex justify-center gap-1 w-full '}>
            <input type="text" defaultValue={name} value={value} onChange={e => setValue(e.target.value)} autoFocus
                   className={'flex-1 py-0.5 px-2 transition rounded-lg border-2 border-brand-6 bg-zinc-50 outline-none hover:border-brand-4 focus:bg-zinc-100 focus:border-brand-4'}
            />
            <div
                className={'flex gap-1 items-center'}>
                <button type="submit" className={'text-brand-4 transition hover:text-brand-6 focus:text-brand-6'}>
                    <IconDeviceFloppy/>
                </button>
                <button type="button" onClick={disableEditing}
                        className={'text-red-200 transition hover:text-red-400 focus:text-red-500'}>
                    <IconX/>
                </button>
            </div>
        </form>
    </li>
}