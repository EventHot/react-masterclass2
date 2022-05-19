import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo {
    text: string;
    id: number;
    category: string;
}

export const categoryState = atom<string>({
    key: "category",
    default: "TO_DO",
});

export const { persistAtom } = recoilPersist({
    key: "toDoPersist",
});

export const categoriesState = atom<string[]>({
    key: "categories",
    default: ["TO_DO", "DOING", "DONE"],
    effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const toDoCategorySelector = selector({
    key: "toDoCategorySelector",
    get: ({ get }) => {
        const toDoCategory = get(categoriesState);

        return toDoCategory;
    },
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});
