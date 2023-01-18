import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { ImcompleteTodo } from "./components/ImcompleteTodo";
import { CompleteTodo } from "./components/CompleteTodo";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [imcompleteTodos, setImcompleteTodos] = useState([]);
  const [completeTodo, setCompleteTodo] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...imcompleteTodos, todoText];
    setImcompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...imcompleteTodos];
    newTodos.splice(index, 1);
    setImcompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newImcompleteTodos = [...imcompleteTodos];
    newImcompleteTodos.splice(index, 1);
    setImcompleteTodos(newImcompleteTodos);
    const newCompleteTodo = [...completeTodo, imcompleteTodos[index]];
    setCompleteTodo(newCompleteTodo);
  };

  const onClickBack = (index) => {
    const newCompleteTodo = [...completeTodo];
    newCompleteTodo.splice(index, 1);
    setCompleteTodo(newCompleteTodo);

    const newImcompleteTodos = [...imcompleteTodos, completeTodo[index]];
    setImcompleteTodos(newImcompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={imcompleteTodos.length >= 5}
      />
      {imcompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは5個までです。まずは消化しよか。
        </p>
      )}
      <ImcompleteTodo
        imcompleteTodos={imcompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodo todo={completeTodo} onClick={onClickBack} />
    </>
  );
};
