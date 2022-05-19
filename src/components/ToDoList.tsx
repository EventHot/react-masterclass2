import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoCategorySelector, categoryState, toDoSelector } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const ContainerCategory = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`;

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const toDoCategory = useRecoilValue(toDoCategorySelector);

    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    return (
        <Container>
            <div>
                <h1>TO-DO LIST</h1>
            </div>
            <hr />
            <ContainerCategory>
                <select value={category} onInput={onInput}>
                    {toDoCategory.map((cate) => (
                        <option value={cate}>{cate}</option>
                    ))}
                </select>
                <CreateCategory />
            </ContainerCategory>
            <CreateToDo />
            {toDos?.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
        </Container>
    );
}

export default ToDoList;
