import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoCategorySelector, IToDo, toDoState } from "../atoms";

export const TodoItem = styled.div`
    padding: 5px 5px;
    border: 1px solid #fff;
    width: 50%;
    display: flex;
    margin-bottom: 10px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

export const Do = styled.div`
    flex: 1;
`;

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const toDoCategory = useRecoilValue(toDoCategorySelector);

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: name as any };
            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
        });
    };
    const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;

        setToDos((oldToDos) => {
            const delToDo = { text, id, category: name as any };
            const newTodo = oldToDos.filter((toDo) => toDo.id !== delToDo.id);
            return newTodo;
        });
    };
    return (
        <TodoItem>
            <Do>{text}</Do>
            {toDoCategory.map((cate) => {
                return (
                    category !== cate && (
                        <button name={cate} onClick={onClick}>
                            {cate}
                        </button>
                    )
                );
            })}
            <button onClick={onDeleteClick}>REMOVE</button>
        </TodoItem>
    );
}

export default ToDo;
