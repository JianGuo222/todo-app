import React, { useState } from "react";
import { Header, Layout, ListSection } from "./index.style";
import ControlForm from "./ControlForm";
import ItemList from "./ItemList";
import { initialTodos } from "./initTodos";

export enum SortKeys {
  priority = "priority",
  text = "text",
}

type TodoListProps = {
  defaultNewItemText?: string;
};

const defaultPriority = 1;

const TodoList: React.FC<TodoListProps> = ({
  defaultNewItemText = "",
}: TodoListProps) => {
  const [todos, setTodos] = useState<Array<TodoItem>>(initialTodos);
  const [sortKey, setSortKey] = useState<SortKeys>(SortKeys.priority);

  const updateItem: UpdateItem = (
    selectedId: string,
    key: string,
    value: boolean | number
  ) => {
    const updatedTodos = todos.map((todo: TodoItem) => {
      if (todo.id === selectedId) {
        return { ...todo, [key]: value };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const addTodo: AddTodo = (newTodo: string) => {
    newTodo.trim() !== "" &&
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo,
          priority: defaultPriority,
          complete: false,
        },
      ]);
  };

  const deleteItem: DeleteItem = (deleteId: string) => {
    const updatedTodos = todos.filter(({ id }: TodoItem) => id !== deleteId);
    setTodos(updatedTodos);
  };

  const itemListProps = {
    todos,
    sortKey,
    updateItem,
    deleteItem,
  };

  return (
    <Layout>
      <Header>
        <h1>React Todo App</h1>
      </Header>
      <ControlForm
        addTodo={addTodo}
        sortKey={sortKey}
        setSortKey={setSortKey}
        defaultNewItemText={defaultNewItemText}
      />
      <ListSection>
        <ItemList {...itemListProps} id="pending-list" />
        <ItemList showCompleted {...itemListProps} id="completed-list" />
      </ListSection>
    </Layout>
  );
};

export default TodoList;
