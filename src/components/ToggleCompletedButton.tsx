import {IconCircle, IconCircleCheckFilled} from "@tabler/icons-react";
import {useDispatch} from "react-redux";
import {toggleComplete} from "../store/todo-list";
import {ButtonHTMLAttributes} from "react";

type Props = {
    isCompleted: boolean,
    itemId: number,
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function ToggleCompletedButton({itemId, isCompleted, className, ...props}: Props) {
    const dispatch = useDispatch()

    const handleToggleComplete = () => {
        dispatch(toggleComplete(itemId))
    }

    return <>
        <input type={'checkbox'} hidden checked={isCompleted}/>
        <button
            {...props}
            onClick={handleToggleComplete}
            className={`${className || ''} cursor-pointer relative w-6 h-6 ` +
                '*:absolute *:left-1/2 *:top-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:overflow-hidden *:transition-all *:duration-500'}>
            <IconCircleCheckFilled
                title={'Выполнено'}
                className={`text-brand-6 ${isCompleted ? 'h-full visible opacity-100' : 'h-0 invisible opacity-0'}`}/>
            <IconCircle
                title={'Не выполнено'}
                className={`text-brand-9 ${!isCompleted ? 'h-full visible opacity-100' : 'h-0 invisible opacity-0'}`}/>
        </button>
    </>
}