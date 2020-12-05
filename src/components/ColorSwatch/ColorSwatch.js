import styled from 'styled-components';

export const ColorSwatch = styled.div`
  height: 32px;
  width: 32px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 6px;
  display: inline-block;
  background-color: ${({ bg = '#fff' }) => bg};
`;
