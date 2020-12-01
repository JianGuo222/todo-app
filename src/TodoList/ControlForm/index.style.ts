import styled from "styled-components";

export const FieldSet = styled.div`
  margin: 1em 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const FormContainer = styled.form`
  input[type="text"] {
    height: 2em;
    max-width: 100%;
    width: 20em;
    margin-right: 1em;
  }

  button {
    height: 2em;
    margin: 1em 0;
  }

  label {
    cursor: pointer;
    text-transform: capitalize;
  }
`;
