import React from "react";
import { SortKeys } from "..";
import { ListContainer, Item, Title, Section, Priority } from "./index.style";

interface ItemListProps {
  id: string;
  todos: Array<TodoItem>;
  updateItem: UpdateItem;
  showCompleted?: boolean;
  sortKey: SortKeys;
  deleteItem: DeleteItem;
}

const ItemList: React.FC<ItemListProps> = ({
  id,
  todos,
  updateItem,
  showCompleted = false,
  sortKey,
  deleteItem,
}) => {
  const list = todos
    .filter(({ complete }: TodoItem) => complete === showCompleted)
    .sort((a: TodoItem, b: TodoItem) => (a[sortKey] >= b[sortKey] ? 1 : -1));

  const updatePriority = (id: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateItem(id, "priority", parseInt(e.target.value));
    e.target.blur();
  };

  return (
    <Section id={id}>
      <Title>
        {showCompleted ? "Completed Items" : "Pending Items"} {list.length}
      </Title>
      <ListContainer>
        {list.map(({ id, text, priority }) => (
          <Item key={id} id={`item-${id}`}>
            <label>
              <input
                type="checkbox"
                onChange={() => updateItem(id, "complete", !showCompleted)}
                checked={showCompleted}
              />
              {text}
            </label>
            <Priority>
              Priority:
              <input
                type="number"
                value={priority}
                onChange={updatePriority(id)}
              />
            </Priority>
            <button name="delete-button" onClick={() => deleteItem(id)}>
              Delete
            </button>
          </Item>
        ))}
      </ListContainer>
    </Section>
  );
};

export default ItemList;
