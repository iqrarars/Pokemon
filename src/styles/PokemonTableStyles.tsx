import styled from "@emotion/styled";

export const PokemonTableContainer = styled.table`
  align-items: center;
  text-align: center;
  width: 70%;
  border-spacing: 0;
  color: black;
  margin-left: 13.5rem;
  outline: none;
`;

export const CollapseButton = styled.button`
  position: absolute;
  top: 7rem;
  right: 10rem;
  height: 3rem;
  width: 8rem;
  background-color: #ffcc03;
  cursor: pointer;
  border-radius: 0.5rem;
`;

export const TableHeader = styled.thead`
  background-color: #306db6;
`;

export const TableRow = styled.tr<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "lightgray" : "white")};
  &:nth-of-type(even) {
    background-color: ${(props) => (props.selected ? "lightgray" : "white")};
  }
  cursor: pointer;
`;

export const TableCell = styled.td`
  border: 1px solid #3763ac;
  padding: 1rem;
`;

export const TableHeaderCell = styled.th`
  border: 1px solid black;
  padding: 0.5rem;
`;
