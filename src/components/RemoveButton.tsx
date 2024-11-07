import {IconTrash} from "@tabler/icons-react";
import {useDispatch} from "react-redux";
import {removeItem} from "../store/todo-list";

type Props = { id: number }

export default function RemoveButton({id}: Props) {
    const dispatch = useDispatch()

    const handleRemove = () => {
        dispatch(removeItem(id))
    }
    
    return <button onClick={handleRemove}>
        <IconTrash className={'text-red-200 transition hover:text-red-400 focus:text-red-500'}
                   size={20}
        />
    </button>
}