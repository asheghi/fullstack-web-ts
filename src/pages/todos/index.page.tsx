import React, { useState } from "react";
import {
  TodoItem,
  onNewTodo,
  removeTodo,
  toggleStatus,
} from "./todos.telefunc";

const Page = (props: any) => {
  const [todos, setTodos] = useState<Array<TodoItem>>(props.todoItemsInitial);
  const [inputText, setInputText] = useState("");

  const handleAdd = async () => {
    const { todoItems } = await onNewTodo({ text: inputText });

    setInputText("");
    setTodos(todoItems);
  };

  const handleSwitchStatus = async (todo: TodoItem) => {
    const { todoItems } = await toggleStatus(todo.id);

    setTodos(todoItems);
  };

  const handleDelete = async (todo: TodoItem) => {
    const { todoItems } = await removeTodo(todo.id);

    setTodos(todoItems);
  };

  return (
    <div className="h-screen max-w-[320px] mx-auto flex flex-col gap-4 pt-8">
      <h1 className="mr-auto font-extrabold text-blue-500">Todos</h1>
      <div className="flex gap-2">
        <input
          className="p-1 border border-gray-500 rounded w-full"
          onChange={(e) => setInputText(e.target.value)}
          placeholder="new todo"
          value={inputText}
        ></input>
        <button
          className="uppercase font-bold bg-blue-500 rounded text-white px-2 py-1"
          onClick={() => handleAdd()}
        >
          add
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <div
            className="py-1 flex gap-2 text-gray-700 items-center group"
            key={todo.id}
          >
            <input
              onChange={() => handleSwitchStatus(todo)}
              type="checkbox"
              className="w-4 h-4"
            />{" "}
            {todo.text}
            <button
              onClick={() => handleDelete(todo)}
              className="ml-auto text-xs opacity-0 group-hover:opacity-100 transition"
            >
              Archive
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Page };
