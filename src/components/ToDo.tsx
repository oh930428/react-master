import React from "react";
import { categoryState, IToDo, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryState);

  const onClick = (category: string) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories.map(
        (oldCategory) =>
          oldCategory !== category && (
            <button key={oldCategory} onClick={() => onClick(oldCategory)}>
              {oldCategory}
            </button>
          )
      )}
    </li>
  );
}

export default ToDo;
