import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export interface IToDo {
  id: number;
  text: string;
  category: string;
}

export interface ICategoryTodos {
  [key: string]: string;
}

const { persistAtom: persistToDo } = recoilPersist({
  key: "toDo",
  storage: localStorage,
});

const { persistAtom: persistCategory } = recoilPersist({
  key: "category",
  storage: localStorage,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistToDo],
});

export const categoryState = atom<string[]>({
  key: "category",
  default: [],
  effects_UNSTABLE: [persistCategory],
});

export const selectedCategoryState = atom<string>({
  key: "selectedCategory",
  default: "",
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(selectedCategoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
