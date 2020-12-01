import React, { createRef, FormEvent, Fragment } from "react";
import { FormContainer, FieldSet } from "./index.style";
import { SortKeys } from "..";

interface ControlFormProps {
  addTodo: AddTodo;
  sortKey: string;
  setSortKey: SetSortKey;
  defaultNewItemText: string;
}

const ControlForm: React.FC<ControlFormProps> = ({
  addTodo,
  sortKey,
  setSortKey,
  defaultNewItemText = "",
}: ControlFormProps) => {
  const textInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!textInput.current) {
      return;
    }
    addTodo(textInput.current.value);
    textInput.current.value = "";
  };

  return (
    <FormContainer>
      <FieldSet>
        <input
          id="add-input"
          type="text"
          placeholder="What needs to be done?"
          ref={textInput}
          defaultValue={defaultNewItemText}
        />
        <button id="add-button" type="submit" onClick={handleSubmit}>
          Add Todo
        </button>
      </FieldSet>
      <FieldSet>
        {Object.keys(SortKeys).map((key: string) => (
          <Fragment key={key}>
            <input
              type="radio"
              id={`sort-${key}`}
              value={key}
              name="sort"
              checked={key === sortKey}
              onChange={() => setSortKey(key as SortKeys)}
            />{" "}
            <label htmlFor={`sort-${key}`}>{key}</label>
          </Fragment>
        ))}
      </FieldSet>
    </FormContainer>
  );
};

export default ControlForm;
