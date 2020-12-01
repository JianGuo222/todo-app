import styled from "styled-components";

export const Section = styled.div`
  align-self: flex-start;
  flex-basis: 48%;
`;

export const ListContainer = styled.ul`
  margin: 1em 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
`;

export const Item = styled.li`
  width: 100%;
  list-style: none;
  margin: 1em 0;
  border: solid 1px #ccc;
  padding: 1em;
`;

export const Title = styled.h3`
  width: 100%;
`;

export const Priority = styled.div`
  width: 100%;
  margin: 0.5em 0;

  input[type="number"] {
    width: 3em;
    margin: 0 1em;
  }
`;
