import { useRecoilState, useRecoilValue } from "recoil";

import { categoryState, selectedCategoryState, toDoSelector } from "./atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoryState);

  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const onInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.currentTarget.value);
    setSelectedCategory(event.currentTarget.value as any);
  };

  console.log(toDos);

  return (
    <div style={{ marginInline: "20px" }}>
      <h1>To Dos</h1>
      <hr />
      <select value={selectedCategory} onChange={onInput}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
