import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoriesState } from "../atoms";

interface IForm {
    toDoCategory: string;
}

function CreateCategory() {
    const setToDosCategory = useSetRecoilState(categoriesState);
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const handleValid = ({ toDoCategory }: IForm) => {
        setToDosCategory((oldToDos) => [...oldToDos, toDoCategory]);
        setValue("toDoCategory", "");
    };
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input
                {...register("toDoCategory", {
                    required: "Please write a To Do Category",
                })}
                placeholder="Write a to do Category"
            />
            <button>Add</button>
        </form>
    );
}

export default CreateCategory;
