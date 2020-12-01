type TodoItem = {
  id: string;
  text: string;
  priority: number;
  complete: boolean;
};

type AddTodo = (newTodo: string) => void;
type DeleteItem = (deleteId: string) => void;

type UpdateItem = (
  selectedId: string,
  key: string,
  value: boolean | number
) => void;

type SetSortKey = React.Dispatch<React.SetStateAction<SortKeys>>;
