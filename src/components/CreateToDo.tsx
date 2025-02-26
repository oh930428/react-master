import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
  customCategory: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const setCategories = useSetRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo, customCategory }: IForm) => {
    setCategories((oldCategories) => {
      if (oldCategories.includes(customCategory)) {
        return oldCategories;
      }
      return [...oldCategories, customCategory];
    });
    setToDos((oldToDos) => [
      ...oldToDos,
      { id: Date.now(), text: toDo, category: customCategory },
    ]);

    setValue("toDo", "");
    setValue("customCategory", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("customCategory", { required: "Please write a category" })}
        placeholder="Write a category"
      />
      <input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
