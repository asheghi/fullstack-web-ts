import { getContext } from "telefunc";
import { Session } from "next-auth";

export type TodoItem = {
  id: number;
  text: string;
  done?: boolean;
};

const db: {
  todos: TodoItem[];
} = {
  todos: [],
};

async function loadData() {
  const ctx: { session: Session } = getContext();
  const { session } = ctx;
  const { todos: todoItems } = db;

  return {
    session,
    todoItems,
  };
}

async function onNewTodo({ text }: { text: string }) {
  db.todos.push({ id: db.todos.length, text });
  const { todos: todoItems } = db;

  return { todoItems };
}

async function removeTodo(id: number) {
  db.todos = db.todos.filter((it) => {
    return it.id !== id;
  });

  return { todoItems: db.todos };
}

async function toggleStatus(id: number) {
  const index = db.todos.findIndex((it) => it.id === id);
  const todo = db.todos[index];

  if (!todo) throw new Error("invalid id");

  todo.done = !todo.done;

  return { todoItems: db.todos };
}

// Initial data
db.todos.push({ id: db.todos.length, text: "Buy milk" });
db.todos.push({
  id: db.todos.length,
  text: "Do the chores",
});

export { loadData };
export { onNewTodo, removeTodo, toggleStatus };
