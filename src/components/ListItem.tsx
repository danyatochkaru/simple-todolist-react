import {IconPencil} from "@tabler/icons-react";
import ToggleCompletedButton from "./ToggleCompletedButton";
import RemoveButton from "./RemoveButton";

type Props = { id: number, name: string, isCompleted?: boolean, enableEditing: () => void }

export default function ListItem({id, name, isCompleted, enableEditing}: Props) {
    return <li
        className={'group flex justify-between items-center gap-2 w-full hover:bg-brand-0 focus-within:bg-brand-0 p-2 rounded'}>
        <div className={'flex justify-between items-center gap-2'}>
            <ToggleCompletedButton className={'peer/test'} isCompleted={!!isCompleted} itemId={id}/>
            <span className={`transition ${isCompleted ? 'text-zinc-500 line-through' : ''}`}>{name}</span>
        </div>
        <div
            className={'flex gap-1 items-center invisible opacity-0 transition-all duration-400 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 focus-within:visible focus-within:opacity-100'}>
            <button>
                <IconPencil className={'text-brand-4 transition hover:text-brand-6 focus:text-brand-6'}
                            size={20}
                            onClick={enableEditing}
                />
            </button>
            <RemoveButton id={id}/>
        </div>
    </li>
}