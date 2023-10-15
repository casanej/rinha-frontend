import { styled } from "styled-components";

export const HomePageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  width: 100vw;
  height: 100svh;
`;

export const HomePageTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  line-height: 58px;
  letter-spacing: 0em;
  text-align: left;
`;

export const HomePageErrorMessage = styled.div`
  color: #BF0E0E;
  font-size: 16px;
  font-weight: 400;
`;