import styled from 'styled-components';

export const UnstyledButton = styled.button`
  border: 0;
  background-color: none;
  cursor: pointer;
  &:not:focus {
    outline: none;
  }
`;
