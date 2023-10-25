import { styled } from 'styled-components';

export const JsonViewerPageStyled = styled.div`
  width: 100%;
  max-width: 1900px;
  height: 100vh;
  margin: 0 auto;
  padding: 24px 0 0 0;
`;

export const JsonViewerFileName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  letter-spacing: 0em;

  display: flex;
  flex-direction: row;
  gap: 10px;

  span {
    transform: rotate(180deg);
    cursor: pointer;
    font-weight: normal;
  }
`;

export const JsonViewerTree = styled.div`
  height: calc(100% - 40px);
`;